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
    default: "pending",
    enum: ["Pending", "Accepted", "Rejected", "Ghosted", "Interview Rejected"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
});
const JobApplication = mongoose.model(
  "Job Applications",
  jobApplicationSchema,
  "Job Applications"
);
module.exports = JobApplication;
