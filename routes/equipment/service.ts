import Equipment from "./model";

const getAll = async () => {
  return await Equipment.find();
};

const getById = async (id: string) => {
  return await Equipment.findById(id);
};

const create = async (data: any) => {
  return await Equipment.create(data);
};

const updateById = async (id: string, data: any) => {
  return await Equipment.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

const deleteById = async (id: string) => {
  return await Equipment.findByIdAndDelete(id);
};

export default { 
  getAll,
  getById,
  create,
  updateById,
  deleteById
 };
