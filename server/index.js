import "dotenv/config";
import connectToMongo from "./DB/connection.js";
import express from "express";
import cors from "cors";
import uploadRouter from "./routes/upload.route.js";
import pushRouter from "./routes/pushNoti.route.js";
import userRouter from "./routes/loginRegisteration.route.js";
import { upload } from "./services/multer.service.js";
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

connectToMongo();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/upload", uploadRouter);
app.use("/push", pushRouter);
app.use("/api/user",userRouter);

app.listen(port, () => console.log(`Running at port ${port}`));
