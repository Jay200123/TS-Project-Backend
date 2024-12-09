import History from "./model";
import { IHistory } from "../../interface";

const getAll = async () => {
    return await History.find()
        .populate({
            path: "ticket",
            select: "_id device description date_submitted date_resolved status category level assignee findings image",
            populate: [
                {
                    path: 'device',
                    select: 'type description owner status serial_number',
                    populate: [
                        {
                            path: 'owner',
                            select: 'fullname lname department position branch',
                            populate: [
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
                    ]
                },
                {
                    path: "assignee",
                    select: "fullname lname"
                }
            ],
        })
        .lean()
        .exec();
}

const getById = async (id: string) => {
    return await History.findById(id)
        .populate({
            path: "ticket",
            select: "_id device description date_submitted date_resolved status category level assignee findings image",
            populate: [
                {
                    path: 'device',
                    select: 'type description owner status serial_number',
                    populate: [
                        {
                            path: 'owner',
                            select: 'fullname lname department position branch',
                            populate: [
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
                    ]
                },
                {
                    path: "assignee",
                    select: "fullname lname"
                }
            ],
        })
        .lean()
        .exec();
}

const Add = async (data: IHistory) => {
    return await History.create(data);
}

const updateById = async (id: string, data: IHistory) => {
    return await History.findByIdAndUpdate(id, data, { runValidators: true, new: true });
}

const deleteById = async (id: string) => {
    return await History.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}