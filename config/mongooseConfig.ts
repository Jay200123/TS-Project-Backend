import { mongoose } from "../interface";
import { STATUSCODE } from "../constants";

export const connectDb = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        process.exit(STATUSCODE.ONE);
    }
}