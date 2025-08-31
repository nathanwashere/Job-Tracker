const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Fullstack");
    console.log("Connectd to data base!");
  } catch (error) {
    console.error("Error while connecting to data base: ", error);
  }
}
module.exports = connectDB;
