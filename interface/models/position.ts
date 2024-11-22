import { mongoose, Types } from "../schema";
import { IDepartment } from "./department";

interface IPosition {
    department: Types.ObjectId | IDepartment;
    position_name: string;
    description: string;
}

export type { IPosition };