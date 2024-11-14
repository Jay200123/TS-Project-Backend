import * as userController from './controller';
import { Router } from "./../../interface";
import { METHOD, PATH, } from '../../constants';

const router = Router();

const userRouter = [
    {
        method: METHOD.GET,
        path: PATH.USERS,
        handler: userController.getAllUser
    },
    {
        method: METHOD.GET,
        path: PATH.USER_ID,
        handler: userController.getUserById
    },
    {
        method: METHOD.POST,
        path: PATH.USERS,
        handler: userController.createUser
    },
    {
        method: METHOD.PATCH,
        path: PATH.EDIT_USER_ID,
        handler: userController.updateUserById
    },
    {
        method: METHOD.DELETE,
        path: PATH.USER_ID,
        handler: userController.deleteUserById
    }
];

userRouter.forEach((route) => {
    const { method, path, handler } = route;
    router[method as any](path, handler);
});

export default router;  