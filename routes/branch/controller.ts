import { ErrorHandler, SuccessHandler, upload } from "../../utils";
import branchService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

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

    const image = await uploadImage(req.files as Express.Multer.File[], oldImage);

    const data = await branchService.updateById(req.params.id,
        {
            ...req.body,
            image: image
        });
    return SuccessHandler(res, 'Branch updated successfully', data)
}

const deleteBranchById = async (req: Request, res: Response, next: NextFunction) => {
    const branch = await branchService.getById(req.params.id);

    const branchImage = Array.isArray(branch?.image)
        ? branch.image.map((i) => i?.public_id)
        : [];

    const data = await branchService.deleteById(req.params.id);
    await cloudinary.api.delete_resources(branchImage);
    
    return SuccessHandler(res, 'Branch deleted successfully', data)
}

export {
    getAllBranch,
    getBranchById,
    createBranch,
    updateBranchById,
    deleteBranchById
}