import { Router, Route } from "../../interface";
import * as positionController from "./controller";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const departmentRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.POSITIONS,
        middleware: [],
        role: [],
        handler: positionController.getAllPositions
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.POSITION_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: positionController.getPositionById
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.POSITIONS,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: positionController.createPosition,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_POSITION_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: positionController.updatePositionById
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.POSITION_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: positionController.deletePositionById
    }
];

departmentRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;