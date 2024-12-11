import Test from "./model";
import { ITest } from "../../interface";

const getAll = async () => {
    return await Test.find();
};

const getById = async (id: string) => {
    return await Test.findById(id);
};

const getOne = async () => {
    return await Test.findOne().sort({ createdAt: -1 })
}

const Add = async (data: ITest) => {
    return await Test.create(data);
};

const updateById = async (id: string, data: ITest) => {
    return await Test.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteById = async (id: string) => {
    return await Test.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    getOne,
    Add,
    updateById,
    deleteById
}