import { Schema, model, mongoose } from "../../interface";
import { RESOURCE } from "../../constants";
import { IUser } from "../../interface";

const userSchema: Schema<IUser> = new Schema({
    idnumber: {
        type: String,
        required: true  
    },
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Employee",
        enum: ["Admin", "Employee", "Technician"],
    },
    isPasswordChanged: {
        type: Boolean,
        default: false
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments"
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "positions"
    }
});

const User = model<IUser>(RESOURCE.USERS, userSchema);
export default User;