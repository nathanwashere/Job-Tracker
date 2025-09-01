const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected", "ghosted"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const JobApplication = mongoose.model(
  "Job Applications",
  jobApplicationSchema,
  "Job Applications"
);
module.exports = JobApplication;
