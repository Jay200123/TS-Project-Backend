import { IBranch, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const BranchSchema: Schema<IBranch> = new Schema({
    branch_name: {
        type: String,
        required: true
    },
    branch_address: {
        type: String,
        required: true
    },
    branch_phone: {
        type: String,
        required: true
    },
    branch_email: {
        type: String,
        required: true
    }
});

const Branch = model<IBranch>(RESOURCE.BRANCH, BranchSchema);
export default Branch;  