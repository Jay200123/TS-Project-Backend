import { Schema, model, ITest } from "../../interface";
import { RESOURCE } from "../../constants"

const TestSchema: Schema<ITest> = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: [
        {
            public_id: String,
            url: String,
            originalname: String
        }
    ]
});

const Test = model<ITest>(RESOURCE.TESTS, TestSchema);

export default Test;