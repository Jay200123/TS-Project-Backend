import borrowService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";

const getAllBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await borrowService.getAll();
  return !data || data.length === 0
    ? next(new ErrorHandler("No Borrow records found"))
    : SuccessHandler(res, "Borrow records found", data);
};

const getOneBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await borrowService.getById(req.params.id);
  return !data
    ? next(new ErrorHandler("No Borrow record found"))
    : SuccessHandler(res, "Borrow record found", data);
};

const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await borrowService.Add({
    ...req.body,
  });

  return !data
    ? next(new ErrorHandler("Borrow record not created"))
    : SuccessHandler(res, "Borrow record created", data);
};

const updateBorrowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await borrowService.updateById(req.params.id, {
    ...req.body,
  });

  return SuccessHandler(res, "Borrow record updated", data);
};

const deleteBorrowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await borrowService.deleteById(req.params.id);
  return !data
    ? next(new ErrorHandler("Borrow record not deleted"))
    : SuccessHandler(res, "Borrow record deleted", data);
};

export {
  getAllBorrows,
  getOneBorrow,
  createBorrow,
  updateBorrowById,
  deleteBorrowById,
};
