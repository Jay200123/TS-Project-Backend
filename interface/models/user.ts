import { Image } from "../image";
import { Document, Types } from "../schema";
import { IBranch } from "./branch";
import { IDepartment } from "./department";
import { IPosition } from "./position";

type Roles = "Admin" | "Technician" | "Employee";

interface IUser extends Document {
  fname: string;
  lname: string;
  phone: string;
  address: string;
  city: string;
  email: string;
  password: string;
  role: Roles;
  branch: Types.ObjectId | IBranch;
  department: Types.ObjectId | IDepartment;
  position: Types.ObjectId | IPosition;
  isAuthorized: boolean;
  image: Image[];
}

export type { IUser };
