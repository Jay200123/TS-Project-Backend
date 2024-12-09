import Ticket from "./model";
import { ITicket } from "../../interface";

const getAll = async () => {
    return await Ticket.find()
        .populate({
            path: "device",
            select: "type description owner status serial_number",
            populate: {
                path: "owner",
                select: "fullname branch department position",
                populate: [
                    {
                        path: "branch",
                        select: "branch_name"
                    },
                    {
                        path: "department",
                        select: "department_name"
                    },
                    {
                        path: "position",
                        select: "position_name"
                    }
                ]
            }
        })
        .populate("assignee", "fullname")
        .lean()
        .exec();
}

const getById = async (id: string) => {
    return await Ticket.findById(id)
        .populate({
            path: "device",
            select: "type status description owner image",
            populate: {
                path: "owner",
                select: "fullname branch department position",
                populate: [
                    {
                        path: "branch",
                        select: "branch_name"
                    },
                    {
                        path: "department",
                        select: "department_name"
                    },
                    {
                        path: "position",
                        select: "position_name"
                    }
                ]
            }
        })
        .populate("assignee", "fullname")
        .lean()
        .exec();
}

const Add = async (data: ITicket) => {
    return await Ticket.create(data);
}

const updateById = async (id: string, data: Partial<ITicket>) => {
    return await Ticket.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

const getTicketByAssignee = async (assignee: string) => {
    return await Ticket.find({ assignee: assignee })
}

const updateAssignee = async (id: string, assignee: string) => {
    return await Ticket.findByIdAndUpdate(id, { assignee: assignee });
}

const deleteById = async (id: string) => {
    return await Ticket.findByIdAndDelete(id);
}

const closeById = async (id: string) => {
    return await Ticket.findByIdAndUpdate(id, { status: "closed", runValidators: true, new: true });
}

const claimById = async (id: string, assignee: string) => {
    return await Ticket.findByIdAndUpdate(id, { assignee: assignee, runValidators: true, new: true });    
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    getTicketByAssignee,
    updateAssignee,
    deleteById,
    closeById,
    claimById
}