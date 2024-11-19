import { IDepartment, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";
import mongoose from "mongoose";

const DepartmentSchema: Schema<IDepartment> = new Schema({
    branch:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "branches", 
    },
    department_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Department = model<IDepartment>(RESOURCE.DEPARTMENT, DepartmentSchema);
export default Department;  