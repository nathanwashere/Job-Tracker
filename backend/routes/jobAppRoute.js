const express = require("express");
const router = express.Router();

const {
  saveJobApplication,
  findAllJobApplication,
  deleteJobApplication,
} = require("../controllers/job-appController");

router.post("/create", saveJobApplication);
router.get("/find", findAllJobApplication);
router.delete("/delete/:jobId", deleteJobApplication);

module.exports = router;
