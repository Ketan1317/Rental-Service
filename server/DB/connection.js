const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
