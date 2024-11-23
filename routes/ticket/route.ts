import { Router, Route } from "../../interface";
import * as ticketController from "./controller";
import { PATH, METHOD, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const ticketRoutes: Route[] = [
    {
        method: METHOD.GET as keyof Router,
        path: PATH.TICKETS,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: ticketController.getAllTickets,
    },
    {
        method: METHOD.GET as keyof Router,
        path: PATH.TICKET_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: ticketController.getOneTicket,
    },
    {
        method: METHOD.POST as keyof Router,
        path: PATH.TICKETS,
        middleware: [verifyToken],
        role: [ROLE.ADMIN, ROLE.EMPLOYEE],
        handler: ticketController.createTicket,
    },
    {
        method: METHOD.PATCH as keyof Router,
        path: PATH.EDIT_TICKET_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: ticketController.updateTicketById,
    },
    {
        method: METHOD.DELETE as keyof Router,
        path: PATH.TICKET_ID,
        middleware: [verifyToken],
        role: [ROLE.ADMIN],
        handler: ticketController.deleteTicketById,
    }
];

ticketRoutes.forEach((route) => {
    const { method, path, middleware = [], role = [], handler } = route;
    router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;