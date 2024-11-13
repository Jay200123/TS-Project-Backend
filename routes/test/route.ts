import testController from "./controller";
import { Router, Route } from "../../interface";
import { METHOD, PATH } from "../../constants";

const router = Router();

const testRouter: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.TESTS,
        handler: testController.getAllTests,
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.TEST_ID,
        handler: testController.getTestById,
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.TESTS,
        handler: testController.createTest,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_TEST_ID,
        handler: testController.updateTestById,
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.TEST_ID,
        handler: testController.deleteTestById,
    }
];

testRouter.forEach((router) => {
    const { method, path, handler } = router;
    router[method as any](path, handler);
});

export default router;  