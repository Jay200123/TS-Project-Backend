import ticketService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler, uploadImage, sendEmail, upload } from "../../utils";
import { cloudinary } from "../../config";
import historyService from "../history/service";
import deviceService from "../device/service";
import { Image } from "../../interface";

const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await ticketService.getAll();
  return !data || data.length === 0
    ? next(new ErrorHandler("No Tickets Found"))
    : SuccessHandler(res, "Tickets data found", data);
};

const getOneTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await ticketService.getById(req.params.id);

  return !data
    ? next(new ErrorHandler("No Ticket record found"))
    : SuccessHandler(res, "Ticket Record found", data);
};

const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const lastTicket = await ticketService.getOne();

  let counter: number = 0;
  let ticketNumber: string = "";

  counter = lastTicket ? lastTicket?.counter + 1 : counter + 1;
  ticketNumber = `IT-T-${counter}`;

  const image = await uploadImage(req.files as Express.Multer.File[], []);
  const data = await ticketService.Add({
    ...req.body,
    counter: counter,
    ticketNumber: ticketNumber,
    image: image,
  });

  return SuccessHandler(res, "Ticket created successfully", data);
};



const updateTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticket = await ticketService.getById(req.params.id);

  const device = await deviceService.getById(ticket.device._id.toString());
  await deviceService.updateById(device?._id.toString(),
    {
      status: req.body.device_status,
    }
  );

  if (req.body.status === "resolved" || req.body.status === "closed") {
    await historyService.Add(
      {
        ticket: ticket._id,
        device_status: req.body.device_status,
      }
    );
  }

  const isClosed = req.body.status === "closed" ? new Date : null;

  const oldImage = Array.isArray(ticket?.image)
    ? ticket.image.map((i) => i?.public_id)
    : [];

  let image: Image[];

  if (Array.isArray(req.files) && req.files.length > 0) {
    image = await uploadImage(req.files as Express.Multer.File[], oldImage);
  } else {
    image = ticket?.image;
  }

  const data = await ticketService.updateById(req.params.id,
    {
      status: req.body.status,
      date_resolved: isClosed,
      findings: req.body.findings,
      image: image,

    }
  );

  return SuccessHandler(res, "Ticket updated successfully", data);
};



const assignTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await ticketService.updateById(req.params.id, {
    assignee: req.body.assignee,
    level: req.body.level,
    status: req.body.status,
  });

  return SuccessHandler(res, "Ticket assigned successfully", data);
};

const getTicketsByAssignee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await ticketService.getTicketByAssignee(req.params.id);

  return !data || data.length === 0
    ? next(new ErrorHandler("No Tickets Found"))
    : SuccessHandler(res, "Tickets data found", data);
}


const deleteTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ticket = await ticketService.getById(req.params.id);

  const ticketImage = Array.isArray(ticket?.image)
    ? ticket.image.map((i) => i?.public_id)
    : [];

  if (ticketImage.length > 0) {
    await cloudinary.api.delete_resources(ticketImage);
  }

  const data = await ticketService.deleteById(req.params.id);

  return !data
    ? next(new ErrorHandler("No Ticket record found"))
    : SuccessHandler(res, "Ticket deleted successfully", data);
};

const closeTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await ticketService.closeById(req.params.id);
  return SuccessHandler(res, "Ticket closed successfully", data);
}

const claimTicketById = async (req: Request, res: Response, next: NextFunction) => {
  const data = await ticketService.claimById(req.params.id, req.body.assignee);
  return SuccessHandler(res, "Ticket claimed successfully", data);
}

export {
  getAllTickets,
  getOneTicket,
  createTicket,
  updateTicketById,
  getTicketsByAssignee,
  assignTicketById,
  deleteTicketById,
  closeTicketById,
  claimTicketById,
};
