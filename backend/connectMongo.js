const mongoose = require("mongoose");

const URL =
  "mongodb+srv://normuradov1305_db_user:Jgg2icAyDej4A81Y@jobtracker.wodplqd.mongodb.net/?retryWrites=true&w=majority&appName=JobTracker";
const URL_localhost = "mongodb://localhost:27017/Fullstack";
async function connectDB() {
  try {
    await mongoose.connect(URL);
    console.log("Connectd to data base!");
  } catch (error) {
    console.error("Error while connecting to data base: ", error);
  }
}
module.exports = connectDB;
