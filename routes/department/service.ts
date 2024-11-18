import Department from "./model";
import { IDepartment } from "../../interface";

const getAll = async () => {
    return await Department.find();
}

const getById = async (id: string) => {
    return await Department.findById(id);
}

const Add = async (data: IDepartment) => {
    return await Department.create(data);
}

const updateById = async (id: string, data: IDepartment) => {
    return await Department.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

const deleteById = async (id: string) => {
    return await Department.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    Add,
    updateById,
    deleteById
}