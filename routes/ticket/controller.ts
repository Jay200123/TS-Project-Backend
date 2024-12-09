import ticketService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler, uploadImage, sendEmail } from "../../utils";
import { cloudinary } from "../../config";
import historyService from "../history/service";
import deviceService from "../device/service";
import userService from "../user/service";

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
  const image = await uploadImage(req.files as Express.Multer.File[], []);
  const data = await ticketService.Add({
    ...req.body,
    image: image,
  });

  const device = await deviceService.getById(data?.device._id.toString());
  const user = await userService.findOneById(device?.owner._id.toString());

  // await sendEmail(user?.email, `Ticket has been created successfully, this is your ticket ID:${data?._id}`);

  // const admins = await userService.findAdminsByEmail();
  // for (const admin of admins) {
  //   await sendEmail(admin.email, `New ticket has been created by ${user?.fname} ${user?.lname} please check the ticket with Ticket ID: ${data?._id}`);
  // }
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

  if (req.body.status === "resolved") {

    const user = await userService.findOneById(device?.owner._id.toString());
    // await sendEmail(user?.email, `Ticket has been resolved with Tickted ID: ${ticket?._id}`);

    const assignee = await userService.findOneById(ticket.assignee.toString()); 

    const admins = await userService.findAdminsByEmail();
    // for (const admin of admins) {
    //   await sendEmail(admin.email, `Ticket already resolved with Ticket ID: ${req.params.id}`);  
    // }

    await historyService.Add(
      {
        ticket: ticket?._id,
        device_status: req.body.device_status,
      }
    );
  }

  const data = await ticketService.updateById(req.params.id,
    {
      status: req.body.status,
      date_resolved: req.body.date_resolved,
      findings: req.body.findings,
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

  const user = await userService.findOneById(req.body.assignee);

  if (user) {
    // await sendEmail(
    //   user.email,
    //   `Ticket has been assigned to you. Please check the ticket with Ticket ID: ${data?._id}.`
    // );
  }

  const device = await deviceService.getById(data?.device._id.toString());

  if (device) {
    const user = await userService.findOneById(device?.owner?._id.toString());
    // await sendEmail(
    //   user.email,
    //   `Ticket has been assigned to ${user.fname} ${user.lname}. Please check the ticket with Ticket ID: ${data?._id}.`
    // );
  }

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

  // const admins = await userService.findAdminsByEmail();
    // for (const admin of admins) {
    //   await sendEmail(admin.email, `Ticket Close with Ticket ID: ${data?._id.toString()}`);  
    // }

  return SuccessHandler(res, "Ticket closed successfully", data);
}

const claimTicketById = async ( req: Request, res: Response, next: NextFunction) => {   
  const data = await ticketService.claimById(req.params.id, req.body.assignee); 
  console.log(req.body.assignee);

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
