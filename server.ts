import { express, mongoose } from "./interface";
import { globalEnvironment, connectDB } from "./config";
import { test, user } from "./routes";
import { upload } from "./utils";
import { errorJson, errorHandler } from "./middleware";
import path from "path";

globalEnvironment();
connectDB();
const app = express();

app.use(upload.array('image'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.use("/api/v1", user, test);

app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notFound.html"));
})

app.use(errorJson);
app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(process.env.PORT);
    console.log(`Server running on ${process.env.PORT}`);
    console.log(`Mongoose Database connected`)
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(1);
})

