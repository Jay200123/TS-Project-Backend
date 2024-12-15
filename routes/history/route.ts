import { Router, Route } from "../../interface";
import * as historyController from "./controller";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const historyRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.HISTORIES,
        middleware: [],
        role: [],
        handler: historyController.getAllHistories
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.HISTORY_ID,
        middleware: [],
        role: [],
        handler: historyController.getHistoryById
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.HISTORIES,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: historyController.createHistory,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_HISTORY_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: historyController.updateHistoryById
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.HISTORY_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: historyController.deleteHistoryById    
    }
];

historyRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;