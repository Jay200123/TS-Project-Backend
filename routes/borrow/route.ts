import * as borrowController from "./controller";
import { Router, Route } from "../../interface";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const borrowRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.BORROWS,
    role: [ROLE.ADMIN, ROLE.TECHNICIAN, ROLE.EMPLOYEE],
    middleware: [verifyToken],
    handler: borrowController.getAllBorrows,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.BORROW_ID,
    role: [ROLE.ADMIN, ROLE.TECHNICIAN, ROLE.EMPLOYEE],
    middleware: [verifyToken],
    handler: borrowController.getOneBorrow,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.BORROWS,
    role: [ROLE.ADMIN, ROLE.TECHNICIAN],
    middleware: [verifyToken],
    handler: borrowController.createBorrow,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_BORROW_ID,
    role: [ROLE.ADMIN, ROLE.TECHNICIAN],
    middleware: [verifyToken],
    handler: borrowController.updateBorrowById,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.BORROW_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: borrowController.deleteBorrowById,
  },
];

borrowRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
