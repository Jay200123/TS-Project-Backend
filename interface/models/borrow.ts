import { IUser } from "./user";
import { IEquipment } from "./equipment";
import { mongoose } from "../schema";

type BorrowStatus = "returned" | "borrowed" | "returned damaged" | "lost";

interface IBorrow extends Document {
  user: mongoose.Types.ObjectId | IUser;
  lender: mongoose.Types.ObjectId | IUser;
  equipment: mongoose.Types.ObjectId | IEquipment;
  serial_number: string;
  reason: string;
  borrow_date: Date;
  return_date: Date;
  quantity: number;
  status: BorrowStatus;
}

export type { 
    IBorrow,
    BorrowStatus
 };
