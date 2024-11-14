import * as userController from './controller';
import { Router } from "./../../interface";
import { METHOD, PATH, ROLE } from '../../constants';
import { verifyToken, userRole } from '../../middleware';

const router = Router();

const userRouter = [
    {
        method: METHOD.GET,
        path: PATH.USERS,
        middleware: [verifyToken],
        role: [ROLE.ADMIN, ROLE.CUSTOMER],
        handler: userController.getAllUser
    },
    {
        method: METHOD.GET,
        path: PATH.USER_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN, ROLE.CUSTOMER],
        handler: userController.getUserById
    },
    {
        method: METHOD.PATCH,
        path: PATH.EDIT_USER_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN, ROLE.CUSTOMER],
        handler: userController.updateUserById
    },
    {
        method: METHOD.DELETE,
        path: PATH.USER_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: userController.deleteUserById
    }
];

userRouter.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;  