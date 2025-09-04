const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getUserCookie,
  logOutUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/sign-up", createUser);
router.post("/logout", logOutUser);
router.get("/me", authMiddleware, getUserCookie);

module.exports = router;
