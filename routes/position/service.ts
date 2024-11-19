import Position from "./model";
import { IPosition } from "../../interface";

const getAll = async () => {
    return await Position.find();
}

const getById = async (id: string) => {
    return await Position.findById(id);
}

const Add = async (data: IPosition) => {
    return await Position.create(data);
}

const updateById = async (id: string, data: IPosition) => {
    return await Position.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

const deleteById = async (id: string) => {
    return await Position.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}