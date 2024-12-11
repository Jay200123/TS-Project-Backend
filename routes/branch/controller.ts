import { ErrorHandler, SuccessHandler, upload } from "../../utils";
import branchService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";
import { Image } from "../../interface";

const getAllBranch = async (req: Request, res: Response, next: NextFunction) => {
    const data = await branchService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No Branches Found"))
        : SuccessHandler(res, "Branches data found", data);
};

const getBranchById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await branchService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No Branch record found"))
        : SuccessHandler(res, "Branch Record found", data)
}

const createBranch = async (req: Request, res: Response, next: NextFunction) => {
    const image = await uploadImage(req.files as Express.Multer.File[], []);

    const data = await branchService.Add({
        ...req.body,
        image: image
    });
    return SuccessHandler(res, 'Branch created successfully', data)
}

const updateBranchById = async (req: Request, res: Response, next: NextFunction) => {
    const branch = await branchService.getById(req.params.id);

    const oldImage = Array.isArray(branch?.image)
        ? branch.image.map((i) => i?.public_id)
        : [];

    let image:Image[];

    if (Array.isArray(req.files) && req.files.length > 0) {
        image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    } else {
        image = branch.image;
    }

    const data = await branchService.updateById(req.params.id, {
        ...req.body,
        image: image,
    });
    return SuccessHandler(res, 'Branch updated successfully', data)
}

const deleteBranchById = async (req: Request, res: Response, next: NextFunction) => {
    const branch = await branchService.getById(req.params.id);

    const branchImage = Array.isArray(branch?.image)
        ? branch.image.map((i) => i?.public_id)
        : [];

    if (branchImage.length > 0) {
        await cloudinary.api.delete_resources(branchImage);
    }

    const data = await branchService.deleteById(req.params.id);

    return SuccessHandler(res, 'Branch deleted successfully', data)
}

export {
    getAllBranch,
    getBranchById,
    createBranch,
    updateBranchById,
    deleteBranchById
}