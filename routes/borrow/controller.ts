import borrowService from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";
import equipmentService from "../equipment/service";

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
  const equipment = await equipmentService.getById(req.body.equipment);

  if (equipment.quantity < Number(req.body.quantity)) {
    return next(new ErrorHandler("Insufficient quantity"));
  }

  await equipmentService.updateById(req.body.equipment, {
    quantity: equipment.quantity - Number(req.body.quantity),
    borrowedQuantity: equipment.borrowedQuantity + req.body.quantity,
  });

  const lastBorrowed = await borrowService.findOne();
  let borrowCounter: number = 0;
  let borrowNumber: string;

  borrowCounter = lastBorrowed ? lastBorrowed.counter + 1 : borrowCounter + 1;
  borrowNumber = `IT-B-${borrowCounter}`;

  const data = await borrowService.Add({
    ...req.body,
    counter: borrowCounter,
    borrowNumber: borrowNumber,
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
  const borrow = await borrowService.getById(req.params.id);

  const equipment = await equipmentService.getById(
    borrow.equipment?._id.toString()
  );


  const isReturned = req.body.status === "returned" ? true : false;
  if (isReturned) {
    await equipmentService.updateById(equipment?._id?.toString(), {
      quantity: equipment.quantity + borrow.quantity,
      borrowedQuantity: equipment.borrowedQuantity - borrow.quantity,
    });
  }

  const isDamage = req.body.status === "returned damaged" ? true : false;

  if (isDamage) {
    await equipmentService.updateById(equipment?._id?.toString(), {
      damagedQuantity: equipment?.damagedQuantity + borrow.quantity,
      borrowedQuantity: equipment?.borrowedQuantity - borrow.quantity,
    });
  }

  const isLost = req.body.status === "lost" ? true : false;

  if (isLost) {
    await equipmentService.updateById(equipment?._id?.toString(), {
      lostQuantity: equipment.lostQuantity + borrow.quantity,
      borrowedQuantity: equipment.borrowedQuantity - borrow.quantity,
    });
  }

  const quantity = Number(req.body.quantity);  
  const data = await borrowService.updateById(req.params.id, {
    ...req.body,
    quantity: quantity,
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
