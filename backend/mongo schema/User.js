const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  employed: Boolean,
});
const User = mongoose.model("Users", userSchema, "Users");
module.exports = User;
