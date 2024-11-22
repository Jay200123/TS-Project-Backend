import { Types } from "../schema";
import { IBranch } from "./branch";

interface IDepartment {
    branch: Types.ObjectId | IBranch; 
    department_name: string;
    description: string;
};

export { IDepartment };