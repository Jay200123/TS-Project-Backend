import { mongoose } from "../schema";

interface IDepartment {
    branch: mongoose.Schema.Types.ObjectId; 
    department_name: string;
    description: string;
};

export { IDepartment };