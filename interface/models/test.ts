import { Document } from "../schema";
import { Image } from "../image";

interface ITest extends Document {
    name: string;
    counter: number;
    ticketNumber: string;
    image: Image[];
    createdAt: Date;
}

export type { ITest }