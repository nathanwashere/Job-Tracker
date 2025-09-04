const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  saveJobApplication,
  findAllJobApplication,
  deleteJobApplication,
} = require("../controllers/job-appController");

router.post("/create", saveJobApplication);
router.get("/find", authMiddleware, findAllJobApplication);
router.delete("/delete/:jobId", deleteJobApplication);

module.exports = router;
