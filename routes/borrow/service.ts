import Borrow from "./model";
import { IBorrow } from "../../interface";

const getAll = async () => {
  return await Borrow.find()
    .populate({
      path: "user",
      select: "fullname position",
      populate: {
        path: "position",
        select: "position_name department",
        populate: {
          path: "department",
          select: "department_name",
        },
      },
    })
    .populate({
      path: "lender",
      select: "fullname position",
      populate: {
        path: "position",
        select: "position_name",
      },
    })
    .populate("equipment", "equipment_name")
    .lean()
    .exec();
};

const getById = async (id: string) => {
  return await Borrow.findById(id)
    .populate({
      path: "user",
      select: "fullname position",
      populate: {
        path: "position",
        select: "position_name department",
        populate: {
          path: "department",
          select: "department_name branch",
          populate: {
            path: "branch",
            select: "branch_name"  
          }
        },
      },
    })
    .populate({
      path: "lender",
      select: "fullname position",
      populate: {
        path: "position",
        select: "position_name",
      },
    })
    .populate("equipment", "equipment_name")
    .lean()
    .exec();
};

const Add = async (data: IBorrow) => {
  return await Borrow.create(data);
};

const updateById = async (id: string, data: Partial<IBorrow>) => {
  return await Borrow.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

const deleteById = async (id: string) => {
  return await Borrow.findByIdAndDelete(id);
};

const findOne = async()=>{
  return await Borrow.findOne().sort({ createdAt: -1})
}

export default {
  getAll,
  getById,
  findOne,
  Add,
  updateById,
  deleteById,
};
