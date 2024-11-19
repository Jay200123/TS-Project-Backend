import { Document, mongoose } from "../schema";
import { Image } from "../image";

type Type = "printer" | "computer" | "laptop" | "monitor" | "mobile";

interface IDevice extends Document {
    owner: mongoose.Types.ObjectId,
    department: mongoose.Types.ObjectId,
    device_name: string,
    type: Type,
    description: string,
    image: Image[]
};

export type { IDevice };