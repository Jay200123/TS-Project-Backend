import { express, mongoose } from "./interface";
import { globalEnvironment, connectDB } from "./config";
import {
  test,
  user,
  auth,
  branch,
  department,
  position,
  device,
  ticket,
  history,
  equipment,
  borrow,
} from "./routes";
import { upload, resetTickets } from "./utils";
import { errorJson, errorHandler } from "./middleware";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOption";

globalEnvironment();
connectDB();
resetTickets();
const app = express();

app.use(upload.array("image"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.delete("/drop/database", async (req, res, next) => {
  await mongoose.connection.db.dropDatabase();
  res.status(200).json({ message: "Database dropped successfully!" });
});

app.use(
  "/api/v1",
  auth,
  test,
  user,
  branch,
  department,
  position,
  device,
  ticket,
  history,
  equipment,
  borrow
);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notFound.html"));
});

app.use(errorJson);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT);
  console.log(`Server running on ${process.env.PORT}`);
  console.log(`Mongoose Database connected`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
