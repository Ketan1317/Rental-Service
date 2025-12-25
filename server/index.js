require("dotenv").config();
const connectToMongo = require("./DB/connection");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const port = 5000 || process.env.PORT;
connectToMongo();

app.get("/", () => {
  console.log("Server is running");
});

app.listen(port, () => console.log(`Running at port ${port}`));
