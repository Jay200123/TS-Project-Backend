import History from "./model";
import { IHistory } from "../../interface";

const getAll = async () => {
    return await History.find();
}

const getById = async (id: string) => {
    return await History.findById(id);
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