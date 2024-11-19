import { Document } from "../schema";
import { Image } from "../image";

type Type = "printer" | "computer" | "laptop" | "monitor" | "mobile";

interface IDevice extends Document {
    device_name: string,
    type: Type,
    description: string,
    image: Image[]
};

export type { IDevice };