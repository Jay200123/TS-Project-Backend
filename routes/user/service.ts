import { IUser } from "../../interface";
import User from "./model";

const getAll = async () => {
    return await User.find()
        .populate("branch", "branch_name")
        .populate("department", "department_name")
        .populate("position", "position_name")
        .lean()
        .exec();
};

const getById = async (id: string) => {
    return await User.findById(id);
};

const getByEmail = async (email: string) => {
    return await User.findOne({ email })
    .populate("branch", "branch_name")
    .populate("department", "department_name")
    .populate("position", "position_name")  
    .lean()
    .exec();
}

const Add = async (data: IUser) => {
    return await User.create(data);
};

const updateById = async (id: string, data: Partial<IUser>) => {
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

const deleteById = async (id: string) => {
    return await User.findByIdAndDelete(id);
}

const findAdminsByEmail = async () => {
    return await User.find({ role: "Admin" }).lean().exec();    
}

const findOneById = async (id: string) => { 
    return await User.findOne({ _id: id })
    .populate("branch", "branch_name")  
    .populate("department", "department_name")
    .populate("position", "position_name")
    .exec();
}

export default {
    getAll,
    getById,
    getByEmail,
    Add,
    updateById,
    deleteById,
    findOneById,
    findAdminsByEmail
}