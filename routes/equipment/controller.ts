import equipmentService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { SuccessHandler, ErrorHandler, uploadImage } from "../../utils";
import { Image } from "../../interface";
import { cloudinary } from "../../config";

const getAllEquipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await equipmentService.getAll();
  return !data || data.length === 0
    ? next(new ErrorHandler("No Equipments Found"))
    : SuccessHandler(res, "Equipments data found", data);
};

const getOneEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await equipmentService.getById(req.params.id);
  return !data
    ? next(new ErrorHandler("No Equipment record found"))
    : SuccessHandler(res, "Equipment Record found", data);
};

const createEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = await uploadImage(req.files as Express.Multer.File[], []);
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  const data = await equipmentService.create({
    ...req.body,
    price: price,
    quantity: quantity,
    image: image,
  });

  return SuccessHandler(res, "Equipment created successfully", data);
};

const updateEquipmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const equipment = await equipmentService.getById(req.params.id);

  const oldImage = Array.isArray(equipment?.image)
    ? equipment.image.map((i) => i?.public_id)
    : [];

  let image: Image[];

  if (Array.isArray(req.files) && req.files.length > 0) {
    image = await uploadImage(req.files as Express.Multer.File[], oldImage);
  } else {
    image = equipment.image;
  }

  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  const data = await equipmentService.updateById(req.params.id, {
    ...req.body,
    price: price,
    quantity: quantity,
    image: image,
  });

  return SuccessHandler(res, "Equipment updated successfully", data);
};

const deleteEquipmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const equipment = await equipmentService.getById(req.params.id);

  const equipmentImage = Array.isArray(equipment?.image)
    ? equipment.image.map((i) => i?.public_id)
    : [];

  if (equipmentImage.length > 0) {
    await cloudinary.api.delete_resources(equipmentImage);
  }

  const data = await equipmentService.deleteById(req.params.id);

  return SuccessHandler(res, "Equipment deleted successfully", data);
};
export {
  getAllEquipments,
  getOneEquipment,
  createEquipment,
  updateEquipmentById,
  deleteEquipmentById
};
