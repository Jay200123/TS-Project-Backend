import userService from "./service";
import { 
  ErrorHandler,
   SuccessHandler
} from "../../utils";
import { 
  Request,
  Response,
  NextFunction
} from "../../interface";
import {
  uploadImage,
  hashPassword,
  sendEmail
 } from "../../utils";
import { STATUSCODE } from "../../constants";
import { cloudinary } from "../../config";

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = await userService.getAll();
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler("No Users Found"))
    : SuccessHandler(res, "Users data found", data);
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const data = await userService.getById(req.params.id);
  return !data
    ? next(new ErrorHandler("No User record found"))
    : SuccessHandler(res, "User Record found", data);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const password = await hashPassword(req.body.password);
  const image = await uploadImage(req.files as Express.Multer.File[], []);
  await sendEmail(req.body.email, `Hi! ${req.body.fname} ${req.body.lname}, Your registration is currently under review, and you will be notified once it has been approved by an administrator.`); 

  const data = await userService.Add({
    ...req.body,
    image: image,
    password: password,
  });

  const admins = await userService.findAdminsByEmail();
  for(const admin of admins){
    await sendEmail(admin.email, `A new user has registered at the IT Support Ticket System ${req.body.fname} ${req.body.lname} please approve or disapprove the user`); 
  }; 

  return SuccessHandler(res, "User created successfully", data);
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.getById(req.params.id);

  const oldImage = Array.isArray(user?.image)
    ? user.image.map((i) => i?.public_id)
    : []; 

  const image = await uploadImage(req.files as Express.Multer.File[], oldImage);
  const data = await userService.updateById(req.params.id,
    {
      ...req.body,
      image: image,
    }
  );

  return SuccessHandler(res, "User updated successfully", data);
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.getById(req.params.id);

  const userImage = Array.isArray(user?.image)
    ? user.image.map((i) => i?.public_id)
    : [];

  if (userImage.length > 0) {
    await cloudinary.api.delete_resources(userImage);
  }

  const data = await userService.deleteById(req.params.id);

  return SuccessHandler(res, "User deleted successfully", data);
};

const activateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await userService.findByIdAndAuthorize(req.params.id);
  await sendEmail(data?.email, `Hi! ${data?.fname} ${data?.lname}, Your registration has been approved by an administrator, you can now login to the IT Support Ticket System`);  

  return !data
    ? next(new ErrorHandler("No User record found"))
    : SuccessHandler(res, "User Record found", data);
};

const userProfileInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  const data = await userService.findOneById(req.params.id);
  return !data
    ? next(new ErrorHandler("No User record found"))
    : SuccessHandler(res, "User Record found", data);
}

const getAllAdmins = async (
  req: Request, 
  res: Response,
  next: NextFunction
  )=>{
    const data = await userService.findAdminsByEmail(); 

  for(const test of data){
    console.log(test.email);
  }
}

export {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  activateUser,
  userProfileInfo,
  getAllAdmins
};
