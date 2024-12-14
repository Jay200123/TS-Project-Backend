import { Types } from "../schema";
import { IDepartment } from "./department";

interface IPosition extends Document {
    department: Types.ObjectId | IDepartment;
    position_name: string;
    description: string;
}

export type { IPosition };