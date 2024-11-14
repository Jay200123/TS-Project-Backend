import { IUser } from "../../interface";
import User from "./model";

const getAll = async () => {
    return await User.find();
};

const getById = async (id: string) => {
    return await User.findById(id);
};

const getByEmail = async (email: string) => {
    return await User.findOne({ email });
}

const Add = async (data: IUser) => {
    return await User.create(data);
};

const updateById = async (id: string, data: IUser) => {
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

const deleteById = async (id: string) => {
    return await User.findByIdAndDelete(id);
}

export default {
    getAll,
    getById,
    getByEmail,
    Add,
    updateById,
    deleteById
}