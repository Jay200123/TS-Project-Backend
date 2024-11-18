import userService from './service';
import { ErrorHandler, SuccessHandler } from '../../utils';
import { Request, Response, NextFunction, } from "../../interface"
import { uploadImage, hashPassword } from '../../utils';
import { STATUSCODE } from '../../constants';
import { cloudinary } from '../../config';

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
        : SuccessHandler(res, "User Record found", data)
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const password = await hashPassword(req.body.password);
    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const data = await userService.Add({
        ...req.body,
        image: image,
        password: password
    });

    return SuccessHandler(res, 'User created successfully', data)
}

const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getById(req.params.id);

    const oldImage = Array.isArray(user?.image)
     ? user.image.map((i) => i?.public_id) 
     : [];

    const image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    const data = await userService.updateById(
        req.params.id,
        {
            ...req.body,
            imag: image,
        }
    );

    return SuccessHandler(res, 'User updated successfully', data)
}

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getById(req.params.id);

    const userImage = Array.isArray(user?.image) 
    ? user.image.map((i) => i?.public_id) 
    : [];

    const data = await userService.deleteById(req.params.id);
    await cloudinary.api.delete_resources(userImage)

    return next(SuccessHandler(res, 'User deleted successfully', data))
}

export {
    getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
}