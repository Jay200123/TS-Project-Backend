import { Document } from "../schema";

interface IBranch extends Document {
    branch_name: string;
    branch_address: string;
    branch_phone: string;
    branch_email: string;
}

export type { IBranch } 