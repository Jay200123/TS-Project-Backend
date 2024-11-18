import { ErrorHandler, SuccessHandler } from "../../utils";
import departmentService from "./service";
import { Request, Response, NextFunction } from "../../interface";

const getAllDeparments = async (req: Request, res: Response, next: NextFunction) => {
    const data = await departmentService.getAll();
    return !data || data.length === 0
        ? next(new ErrorHandler("No department found"))
        : SuccessHandler(res, "Deparment Found", data);
}

const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await departmentService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler("No department found"))
        : SuccessHandler(res, "Department Found", data);
}

const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const data = await departmentService.Add(req.body);
    return !data
        ? next(new ErrorHandler("Department not created"))
        : SuccessHandler(res, "Department Created", data);
}

const updateDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await departmentService.updateById(req.params.id, req.body);
    return SuccessHandler(res, "Department Updated", data);
}

const deleteDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await departmentService.deleteById(req.params.id);
    return !data
        ? next(new ErrorHandler("Department not found"))
        : SuccessHandler(res, "Department Deleted", data);
}

export {
    getAllDeparments,
    getDepartmentById,
    createDepartment,
    updateDepartmentById,
    deleteDepartmentById
}