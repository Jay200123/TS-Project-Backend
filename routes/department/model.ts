import { IDepartment, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const DepartmentSchema: Schema<IDepartment> = new Schema({
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