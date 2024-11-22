import Defective from "./model";
import { IDefective } from "../../interface";

const getAll = async () => {
    return await Defective.find();
}

const getById = async (id: string) => {
    return await Defective.findById(id);
}

const Add = async (data: IDefective) => {
    return await Defective.create(data);
}

const updateById = async (id: string, data: IDefective) => {
    return await Defective.findByIdAndUpdate(id, data, { runValidators: true, new: true });
}

const deleteById = async (id: string) => {
    return await Defective.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}