import { IBranch, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const BranchSchema: Schema<IBranch> = new Schema({
    branch_name: {
        type: String,
        required: true
    },
    address: {
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
    image: [
        {
            public_id: String,
            url: String,
            originalname: String
        }
    ]
});

const Branch = model<IBranch>(RESOURCE.BRANCH, BranchSchema);
export default Branch;  