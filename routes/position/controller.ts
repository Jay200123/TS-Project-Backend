import { ErrorHandler, SuccessHandler } from "../../utils";
import positionService from "./service";
import { Request, Response, NextFunction } from "../../interface";

const getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
    const data = await positionService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No positions found"))
        : SuccessHandler(res, "Position Found", data);
}

const getPositionById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await positionService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No Position found"))
        : SuccessHandler(res, "Position Found", data);
}

const createPosition = async (req: Request, res: Response, next: NextFunction) => {
    const data = await positionService.Add(req.body);
    return !data
        ? next(new ErrorHandler("Position not created"))
        : SuccessHandler(res, "Position Created", data);
}

const updatePositionById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await positionService.updateById(req.params.id, req.body);
    return SuccessHandler(res, "Position Updated", data);
}

const deletePositionById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await positionService.deleteById(req.params.id);
    return !data
        ? next(new ErrorHandler("Position not found"))
        : SuccessHandler(res, "Position Deleted", data);
}

export {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePositionById,
    deletePositionById
}