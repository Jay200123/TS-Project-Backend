import { ErrorHandler, SuccessHandler } from "../../utils";
import defectiveService from "./service";
import { Request, Response, NextFunction } from "../../interface";

const getAllDefectives = async (req: Request, res: Response, next: NextFunction) => {
    const data = await defectiveService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No Defectives found"))
        : SuccessHandler(res, "Defective data Found", data);
}

const getDefectiveById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await defectiveService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No Defective found"))
        : SuccessHandler(res, "Defective Found", data);
}

const createDefective = async (req: Request, res: Response, next: NextFunction) => {
    const data = await defectiveService.Add(req.body);
    return !data
        ? next(new ErrorHandler("Defective not created"))
        : SuccessHandler(res, "Defective Created", data);
}

const updateDefectiveById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await defectiveService.updateById(req.params.id, req.body);
    return SuccessHandler(res, "Defective Updated", data);
}

const deleteDefectiveById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await defectiveService.deleteById(req.params.id);
    return !data
        ? next(new ErrorHandler("Defective not found"))
        : SuccessHandler(res, "Defective Deleted", data);
}

export {
    getAllDefectives,
    getDefectiveById,
    createDefective,
    updateDefectiveById,
    deleteDefectiveById
}