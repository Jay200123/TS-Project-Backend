import { mongoose, Schema, model, IBlackList } from "../../interface";
import { RESOURCE } from "../../constants";

const blackListSchema: Schema<IBlackList> = new Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
});

const BlackList = model(RESOURCE.BLACKLIST, blackListSchema);

export default BlackList;