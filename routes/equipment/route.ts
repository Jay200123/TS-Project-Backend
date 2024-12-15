import { Router, Route } from "../../interface";
import * as equipmentController from "./controller";
import { verifyToken, userRole } from "../../middleware";
import { METHOD, ROLE, PATH } from "../../constants";

const router = Router();

const equipmentRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.EQUIPMENTS,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: equipmentController.getAllEquipments,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.EQUIPMENT_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: equipmentController.getOneEquipment,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.EQUIPMENTS,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: equipmentController.createEquipment,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_EQUIPMENT_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: equipmentController.updateEquipmentById,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.EQUIPMENT_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: equipmentController.deleteEquipmentById,
  },
];

equipmentRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
