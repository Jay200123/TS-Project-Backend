import Device from "./model";
import { IDevice } from "../../interface";


const getAll = async () => {
    return await Device.find();
};

const getById = async (id: string) => {
    return await Device.findById(id);
}

const Add = async (data: IDevice) => {
    return await Device.create(data);
}

const updateById = async (id: string, data: IDevice) => {
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