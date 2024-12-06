import * as userController from "./controller";
import { Router, Route } from "./../../interface";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const userRouter: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.USERS,
    middleware: [verifyToken],
    role: [ROLE.ADMIN, ROLE.EMPLOYEE],
    handler: userController.getAllUser,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.USER_ID,
    middleware: [verifyToken],
    role: [ROLE.ADMIN, ROLE.EMPLOYEE, ROLE.TECHNICIAN],
    handler: userController.getUserById,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_USER_ID,
    middleware: [verifyToken],
    role: [ROLE.ADMIN, ROLE.EMPLOYEE, ROLE.TECHNICIAN],
    handler: userController.updateUserById,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.USER_ID,
    middleware: [verifyToken],
    role: [ROLE.ADMIN],
    handler: userController.deleteUserById,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.ACTIVATE_USER,
    middleware: [verifyToken],
    role: [ROLE.ADMIN],
    handler: userController.activateUser,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.USER_PROFILE,
    middleware: [verifyToken],
    role: [ROLE.ADMIN, ROLE.EMPLOYEE, ROLE.TECHNICIAN],
    handler: userController.userProfileInfo,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.TEST_EMAIL,
    middleware: [verifyToken],
    role: [ROLE.ADMIN, ROLE.EMPLOYEE],
    handler: userController.getAllAdmins ,
},
];

userRouter.forEach((route) => {
  const { method, path, middleware = [], role = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
