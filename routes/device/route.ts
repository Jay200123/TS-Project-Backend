import { Router, Route } from "../../interface";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";
import * as deviceController from "./controller";

const router = Router();

const deviceRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.DEVICES,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: deviceController.getAllDevices,
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.DEVICE_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: deviceController.getOneDevice,
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.DEVICES,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: deviceController.createDevice,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_DEVICE_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: deviceController.updateDeviceById,
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.DEVICE_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: deviceController.deleteDeviceById,
    }
];

deviceRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, [...middleware, userRole(...role)], handler);
});

export default router;