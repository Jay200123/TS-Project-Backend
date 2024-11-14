import { Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";
import { IUser } from "../../interface";

const userSchema: Schema<IUser> = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
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
        enum: ["customer", "admin"],
    },
    image: [
        {
            public_id: String,
            url: String,
            originalname: String
        }
    ]
});

const User = model<IUser>(RESOURCE.USERS, userSchema);
export default User;