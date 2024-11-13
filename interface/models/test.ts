import { Document } from "../schema";
import { Image } from "../image";

interface Test extends Document {
    name: string;
    image: Image[];
}

export type { Test }