import { ErrorHandler, SuccessHandler } from "../../utils";
import historyService from "./service";
import { Request, Response, NextFunction } from "../../interface";

const getAllHistories = async (req: Request, res: Response, next: NextFunction) => {
    const data = await historyService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No History found"))
        : SuccessHandler(res, "History Found", data);
}

const getHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await historyService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No History found"))
        : SuccessHandler(res, "History Found", data);
}

const createHistory = async (req: Request, res: Response, next: NextFunction) => {
    const data = await historyService.Add(req.body);
    return !data
        ? next(new ErrorHandler("History not created"))
        : SuccessHandler(res, "History Created", data);
}

const updateHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await historyService.updateById(req.params.id, req.body);
    return SuccessHandler(res, "History Updated", data);
}

const deleteHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await historyService.deleteById(req.params.id);
    return !data
        ? next(new ErrorHandler("History not found"))
        : SuccessHandler(res, "History Deleted", data);
}

export {
    getAllHistories,
    getHistoryById,
    createHistory,
    updateHistoryById,
    deleteHistoryById
}