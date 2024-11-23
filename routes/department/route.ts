import { Router, Route } from "../../interface";
import * as departmentController from "./controller";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const departmentRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.DEPARTMENTS,
        middleware: [],
        role: [],
        handler: departmentController.getAllDeparments
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.DEPARTMENT_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: departmentController.getDepartmentById
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.DEPARTMENTS,
        middleware: [],
        role: [],
        handler: departmentController.createDepartment,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_DEPARTMENT_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: departmentController.updateDepartmentById
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.DEPARTMENT_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: departmentController.deleteDepartmentById
    }
];

departmentRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;