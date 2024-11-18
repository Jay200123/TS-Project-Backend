import { ErrorHandler, SuccessHandler } from "../../utils";
import branchService from "./service";
import { Request, Response, NextFunction } from "../../interface";

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
    const data = await branchService.Add(req.body);
    return SuccessHandler(res, 'Branch created successfully', data)
}

const updateBranchById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await branchService.updateById(req.params.id, req.body);
    return SuccessHandler(res, 'Branch updated successfully', data)
}

const deleteBranchById = async (req: Request, res: Response, next: NextFunction) => {
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