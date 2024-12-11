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

  const data = await userService.Add({
    ...req.body,
    image: image,
    password: password,
  });

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
  const newPassword = await hashPassword(req.body.newPassword);

  const data = await userService.updateById(req.params.id, { password: newPassword, isPasswordChanged: true });
  return SuccessHandler(res, "Password updated successfully", data);
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const password = await hashPassword(RESOURCE.DEFAULT_PASSWORD);
  const data = await userService.updateById(req.params.id, { password: password, isPasswordChanged: false });
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
