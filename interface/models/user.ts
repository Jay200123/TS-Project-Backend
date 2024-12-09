import { Document, Types } from "../schema";
import { IBranch } from "./branch";
import { IDepartment } from "./department";
import { IPosition } from "./position";

type Roles = "Admin" | "Technician" | "Employee";

interface IUser extends Document {
  idnumber: string; 
  fullname: string;
  phone: string;
  email: string;
  password: string;
  role: Roles;
  branch: Types.ObjectId | IBranch;
  department: Types.ObjectId | IDepartment;
  position: Types.ObjectId | IPosition;
  isPasswordChanged: boolean; 
}

export type { IUser };
