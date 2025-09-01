const express = require("express");
const router = express.Router();

const saveJobApplication = require("../controllers/job-appController");

router.post("/create", saveJobApplication);

module.exports = router;
