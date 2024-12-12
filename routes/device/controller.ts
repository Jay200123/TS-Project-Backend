import deviceService from "./service";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";
import { Request, Response, NextFunction } from "../../interface";
import { Image } from "../../interface";

const getAllDevices = async (req: Request, res: Response, next: NextFunction) => {
    const data = await deviceService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No Devices Found"))
        : SuccessHandler(res, "Devices data found", data);
};

const getOneDevice = async (req: Request, res: Response, next: NextFunction) => {
    const data = await deviceService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No Device record found"))
        : SuccessHandler(res, "Device Record found", data)
};

const createDevice = async (req: Request, res: Response, next: NextFunction) => {
    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const price = Number(req.body.price);
    const data = await deviceService.Add({
        ...req.body,
        price: price,
        image: image
    });
    return SuccessHandler(res, "Device created successfully", data);
}

const updateDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    const device = await deviceService.getById(req.params.id);

    const oldImage = Array.isArray(device?.image)
        ? device.image.map((i) => i?.public_id)
        : [];

        let image:Image[];

        if (Array.isArray(req.files) && req.files.length > 0) {
            image = await uploadImage(req.files as Express.Multer.File[], oldImage);
        } else {
            image = device.image;
        }

    const data = await deviceService.updateById(req.params.id,
        {
            ...req.body,
            image: image
        }
    );

    return SuccessHandler(res, "Device updated successfully", data);
}

const deleteDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    const device = await deviceService.getById(req.params.id);

    const deviceImage = Array.isArray(device?.image)
        ? device.image.map((i) => i?.public_id)
        : [];

    if (deviceImage.length > 0) {
        await cloudinary.api.delete_resources(deviceImage);
    }

    const data = await deviceService.deleteById(req.params.id);

    return !data
        ? next(new ErrorHandler("No Device record found"))
        : SuccessHandler(res, "Device deleted successfully", data);
}

export {
    getAllDevices,
    getOneDevice,
    createDevice,
    updateDeviceById,
    deleteDeviceById
}