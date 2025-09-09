const User = require("../mongo schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, isEmployed } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
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

    // ✅ create JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // ✅ no quotes
      { expiresIn: "1h" }
    );

    // 💡 Sanitize the user object before sending it in the response
    const sanitizedUser = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      employed: newUser.employed,
    };
    const oneHour = 1000 * 60 * 60;
    // Set token in HttpOnly cookie
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: oneHour,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({
        message: "User added successfully",
        user: sanitizedUser,
      });
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
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const sanitizedUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      employed: user.employed,
    };

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const oneHour = 60 * 60 * 1000; // define maxAge
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: oneHour,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({
        message: "User Logged in successfully",
        user: sanitizedUser,
      });
  } catch (error) {
    console.error(`Error while logging in (server): ${error}`);
    res.status(500).json({ message: "Server error" });
  }
}
async function logOutUser(req, res) {
  try {
    // check if jwt cookie exists
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(200).json({ message: "No active session" });
    }
    // clear jwt cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while trying to log out" });
  }
}
async function getUserCookie(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = { createUser, loginUser, getUserCookie, logOutUser };
