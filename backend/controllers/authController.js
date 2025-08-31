const User = require("../mongo schema/User");
const bcrypt = require("bcrypt");
async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, isEmployed } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      employed: isEmployed,
    });
    await newUser.save();
    res.json({ message: "User added successfully  " });
  } catch (error) {
    console.error(`Error while trying to create new user: ${error}`);
    res.status(500).json({ message: "Error saving user" });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No" });
    }

    // compare plain password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "YES" });
    }

    res.json({ message: "Login successful!", user });
  } catch (error) {
    console.error(`Error while logging in (server): ${error}`);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = { createUser, loginUser };
