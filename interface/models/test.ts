import { Document } from "../schema";
import { Image } from "../image";

interface ITest extends Document {
    name: string;
    image: Image[];
}

export type { ITest }