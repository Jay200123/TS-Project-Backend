import Device from "./model";
import { IDevice } from "../../interface";


const getAll = async () => {
    return await Device.find()
        .populate({
            path: 'owner',
            select: 'fullname email department position branch',
            populate: [
                {
                    path: 'branch',
                    select: 'branch_name'
                },
                {
                    path: 'department',
                    select: 'department_name',
                },
                {
                    path: 'position',
                    select: 'position_name'
                }
            ]
        })
        .lean()
        .exec();
};

const getById = async (id: string) => {
    return await Device.findById(id)
        .populate({
            path: 'owner',
            select: 'fullname email department position branch',
            populate: [
                {
                    path: 'branch',
                    select: 'branch_name'
                },
                {
                    path: 'department',
                    select: 'department_name',
                },
                {
                    path: 'position',
                    select: 'position_name'
                }
            ]
        })
        .lean()
        .exec();
}

const Add = async (data: IDevice) => {
    return await Device.create(data);
}

const updateById = async (id: string, data: Partial<IDevice>) => {
    return await Device.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

const deleteById = async (id: string) => {
    return await Device.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}