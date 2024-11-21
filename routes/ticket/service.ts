import Ticket from "./model";
import { ITicket } from "../../interface";

const getAll = async () => {
    return await Ticket.find()
        .populate({
            path: "device",
            select: "type description owner",
            populate: {
                path: "owner",
                select: "fname lname branch department position",
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
        .populate("assignee", "fname lname")
        .lean()
        .exec();
}

const getById = async (id: string) => {
    return await Ticket.findById(id)
        .populate({
            path: "device",
            select: "type description owner",
            populate: {
                path: "owner",
                select: "fname lname branch department position",
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
        .populate("assignee", "fname lname")
        .lean()
        .exec();
}

const Add = async (data: ITicket) => {
    return await Ticket.create(data);
}

const updateById = async (id: string, data: ITicket) => {
    return await Ticket.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

const deleteById = async (id: string) => {
    return await Ticket.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}