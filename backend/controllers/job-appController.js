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
    res.status(500).json({ message: "Error creating new job application" });
  }
}
module.exports = saveJobApplication;
