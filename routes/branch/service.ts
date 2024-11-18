import Branch from "./model";
import { IBranch } from "../../interface";

const getAll = async () => {
    return await Branch.find();
}

const getById = async (id: string) => {
    return await Branch.findById(id);
}

const Add = async (data: IBranch) => {
    return await Branch.create(data);
}

const updateById = async (id: string, data: IBranch) => {
    return await Branch.findByIdAndUpdate(id, data, { runValidators: true, new: true });
}

const deleteById = async (id: string) => {
    return await Branch.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}