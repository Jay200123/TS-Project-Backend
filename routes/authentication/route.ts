import * as userController from '../user/controller';
import * as authController from "./controller";
import { Router } from "../../interface";
import { METHOD, PATH } from "../../constants";

const router = Router();

const authenticationRoutes = [
    {
        method: METHOD.POST,
        path: PATH.USERS,
        handler: userController.createUser,
    },

    {
        method: METHOD.POST,
        path: PATH.LOGIN,
        handler: authController.login,
    },
    {
        method: METHOD.GET,
        path: PATH.LOGOUT,
        handler: authController.logout,
    }
]

authenticationRoutes.forEach((route) => {
    const { method, path, handler } = route;
    router[method as any](path, handler);
});

export default router;
