const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  saveJobApplication,
  findAllJobApplication,
  deleteJobApplication,
  editJobApplication,
} = require("../controllers/job-appController");

router.post("/create", authMiddleware, saveJobApplication);
router.patch("/edit", authMiddleware, editJobApplication);
router.get("/find-all", authMiddleware, findAllJobApplication);
router.delete("/delete/:jobId", authMiddleware, deleteJobApplication);

module.exports = router;
