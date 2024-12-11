import { Schema, model, ITest } from "../../interface";
import { RESOURCE } from "../../constants"

const TestSchema: Schema<ITest> = new Schema({
    name: {
        type: String,
        required: true,
    },
    ticketNumber: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        required: true, 
    },
    image: [
        {
            public_id: String,
            url: String,
            originalname: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,  
    }
});

const Test = model<ITest>(RESOURCE.TESTS, TestSchema);

export default Test;