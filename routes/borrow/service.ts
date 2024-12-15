import Borow from "./model";
import { IBorrow } from "../../interface";

const getAll = async () => {
  return await Borow.find()
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
  return await Borow.findById(id)
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

const Add = async (data: IBorrow) => {
  return await Borow.create(data);
};

const updateById = async (id: string, data: Partial<IBorrow>) => {
  return await Borow.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

const deleteById = async (id: string) => {
  return await Borow.findByIdAndDelete(id);
};

export default {
  getAll,
  getById,
  Add,
  updateById,
  deleteById,
};
