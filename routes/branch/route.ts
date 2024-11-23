import { Route, Router } from "../../interface";
import * as branchController from "./controller";
import { METHOD, PATH, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const branchRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.BRANCHES,
        middleware: [],
        role: [],
        handler: branchController.getAllBranch
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.BRANCH_ID,
        middleware: [],
        role: [],
        handler: branchController.getBranchById,
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.BRANCHES,
        middleware: [],
        role: [],
        handler: branchController.createBranch
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_BRANCH_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: branchController.updateBranchById
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.BRANCH_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: branchController.deleteBranchById
    }
];

branchRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;