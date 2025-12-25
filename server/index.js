require("dotenv").config();
const connectToMongo = require("./DB/connection");
const express = require("express");
const cors = require("cors");
const uploadRouter = require("./routes/upload.route");
const pushRouter = require("./routes/pushNoti.route");
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

connectToMongo();

app.get("/", (req,res) => {
  res.send("Server is running");
});


app.use("/upload",uploadRouter);
app.use("/push",pushRouter);

app.listen(port, () => console.log(`Running at port ${port}`));
