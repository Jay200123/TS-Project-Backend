import { RESOURCE } from "../../constants";
import { IPosition, Schema, model, mongoose } from "../../interface";

const positionSchema: Schema<IPosition> = new Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
    },
    position_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Position = model<IPosition>(RESOURCE.POSITION, positionSchema);
export default Position;