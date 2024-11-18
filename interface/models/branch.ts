import { Document } from "../schema";
import { Image } from "../image";

interface IBranch extends Document {
    branch_name: string;
    address: string;
    phone: string;
    email: string;
    image: Image[];
}

export type { IBranch } 