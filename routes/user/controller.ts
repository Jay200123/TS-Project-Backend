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
import { STATUSCODE, RESOURCE } from "../../constants";
import bcrypt from "bcrypt";

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
  const password = await hashPassword(RESOURCE.DEFAULT_PASSWORD);
  const image = await uploadImage(req.files as Express.Multer.File[], []);
  await sendEmail(req.body.email, `Hi! ${req.body.fullname}, Your account is successfully created please login to the IT Ticket Systems and change your password.`);

  const data = await userService.Add({
    ...req.body,
    image: image,
    password: password,
  });

  const admins = await userService.findAdminsByEmail();
  for (const admin of admins) {
    await sendEmail(
      admin.email, `A new user has registered at the IT Support Ticket System ${req.body.fullname}.`
    );
  };

  return SuccessHandler(res, "User created successfully", data);
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await userService.updateById(req.params.id,
    {
      ...req.body,
    }
  );

  return SuccessHandler(res, "User updated successfully", data);
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await userService.deleteById(req.params.id);

  return SuccessHandler(res, "User deleted successfully", data);
};


const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await userService.findAdminsByEmail();

  for (const test of data) {
    console.log(test.email);
  }
}

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getById(req.params.id);

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return next(new ErrorHandler("Old Password does not match"));
  }

  const newPassword = await hashPassword(req.body.newPassword);

  const data = await userService.updateById(req.params.id, { password: newPassword, isPasswordChanged: true });
  return SuccessHandler(res, "Password updated successfully", data);
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const password = await hashPassword(RESOURCE.DEFAULT_PASSWORD);
  const data = await userService.updateById(req.params.id, { password: password, isPasswordChanged: false });
  await sendEmail(data?.email, `Hi! ${data?.fullname}, Your password has been reset to the default password. Please login to the IT Ticket Systems and change your password.`); 
  return SuccessHandler(res, "Password reset successfully", data);

}
export {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  updatePassword,
  getAllAdmins,
  resetPassword
};
