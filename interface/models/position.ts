import { mongoose } from "../schema";

interface IPosition {
    department: mongoose.Types.ObjectId;
    position_name: string;
    description: string;
}

export type { IPosition };