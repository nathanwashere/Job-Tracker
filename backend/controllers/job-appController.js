const JobApplication = require("../mongo schema/JobApplication");
const User = require("../mongo schema/User");
async function saveJobApplication(req, res) {
  try {
    const { user, company, position, date, status } = req.body;
    const email = user.email;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        message: `User with the email ${email} has not been found while saving a job application!`,
      });
    }
    const newJobApplication = new JobApplication({
      company,
      position,
      date,
      status,
      userId: userFound._id,
    });
    await newJobApplication.save();
    // Send back the created application to the client
    res.status(201).json({
      message: "Job application has been added successfully",
      application: newJobApplication,
    });
  } catch (error) {
    console.log(
      `Error while creating a new job application in backend: ${error}`
    );
    res
      .status(500)
      .json({ message: "Error while creating new job application" });
  }
}
async function findAllJobApplication(req, res) {
  try {
    const userId = req.user.id; // ✅ get user ID from JWT, not query
    const jobApplications = await JobApplication.find({ userId: userId });
    if (!jobApplications.length) {
      return res.status(200).json({
        message: `Could not find any job applications with user id: ${userId}`,
        jobApplications: [],
      });
    }
    return res
      .status(200)
      .json({ message: "Found job applications", jobApplications });
  } catch (error) {
    console.log(
      `Error while trying to access database to get job application with user id: ${error}`
    );
    res.status(500).json({ message: "Error while finding job application" });
  }
}
async function deleteJobApplication(req, res) {
  try {
    const { jobId } = req.params;
    const result = await JobApplication.findByIdAndDelete(jobId);
    if (!result) {
      // Send a 404 if the document was not found
      return res.status(404).json({ message: "Job application not found." });
    }
    return res
      .status(200)
      .json({ message: "Job application deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting job application" });
  }
}

module.exports = {
  saveJobApplication,
  findAllJobApplication,
  deleteJobApplication,
};
