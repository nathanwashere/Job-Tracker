import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Briefcase } from "lucide-react"; // icon
import "react-toastify/dist/ReactToastify.css";
import "../style/Homepage.css";
function Homepage() {
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();
  const [jobApplications, setJobApplications] = useState([]);
  const totalApplications = jobApplications.length;
  const pendingCount = jobApplications.filter(
    (app) => app.status === "pending"
  ).length;
  const acceptedCount = jobApplications.filter(
    (app) => app.status === "accepted"
  ).length;
  const ghostedCount = jobApplications.filter(
    (app) => app.status === "ghosted"
  ).length;
  const rejectedCount = jobApplications.filter(
    (app) => app.status === "rejected"
  ).length;
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  async function getJobApplications() {
    try {
      const applications = await getJobApplicationsForCurrentUser();
      setJobApplications(applications || []);
    } catch (error) {
      console.error(
        `Error while getting job applications from database: ${error}`
      );
    }
  }
  async function getJobApplicationsForCurrentUser() {
    try {
      const response = await fetch(
        `http://localhost:3000/job-application/find-all`,
        {
          credentials: "include", // important for cookies
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      return data.jobApplications;
    } catch (error) {
      console.error(
        `Error while trying to access job application in db: ${error}`
      );
    }
  }
  async function deleteJobApplication(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/job-application/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Response status is --> ",
          response.status
        );
      }
      setJobApplications((prevApps) =>
        prevApps.filter((app) => app._id !== id)
      );
      toast.success("Job application deleted successfully!");
    } catch (error) {
      console.error(`Error while trying to delete job application: ${error}`);
      toast.error("Error!");
    }
  }
  async function logOutUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setUser(null);
    } catch (error) {
      console.error(`Error while trying to log out: ${error}`);
    }
  }
  useEffect(() => {
    getJobApplications();
  }, []);
  return (
    <div>
      <div className="title-box">
        <h1 className="title">
          <Briefcase className="title-icon" />
          Job Tracker
        </h1>
        <div className="title-actions">
          <button
            className="title-button"
            onClick={() => {
              navigator("/add-job");
            }}
          >
            <span className="icon-button">+</span>
            Add application
          </button>
          <button
            className="title-button logout-button"
            onClick={() => {
              toast.success("You have been logged out!");
              logOutUser();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <hr className="title-divider" />
      {jobApplications.length ? (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-top">
                <span>Total Applications</span>
                <i className="card-icon">📦</i>
              </div>
              <div className="card-number">{totalApplications}</div>
            </div>

            <div className="summary-card">
              <div className="card-top">
                <span>Pending</span>
                <i className="card-icon">⏳</i>
              </div>
              <div className="card-number">{pendingCount}</div>
            </div>

            <div className="summary-card">
              <div className="card-top">
                <span>Rejected</span>
                <i className="card-icon">✅</i>
              </div>
              <div className="card-number">{rejectedCount}</div>
            </div>

            <div className="summary-card">
              <div className="card-top">
                <span>Accepted</span>
                <i className="card-icon">🎉</i>
              </div>
              <div className="card-number">{acceptedCount}</div>
            </div>

            <div className="summary-card">
              <div className="card-top">
                <span>Ghosted</span>
                <i className="card-icon">🎉</i>
              </div>
              <div className="card-number">{ghostedCount}</div>
            </div>
          </div>

          <h2>Your job applications are:</h2>
          {jobApplications.map((application) => (
            <div key={application._id} className="job-application-container">
              <h3>
                Company: {application.company}
                <br />
                Position: {application.position}
                <br />
                Status: {application.status}
                <br />
                Date of submission: {formatDate(application.date)}
                <br />
                Location: {application.location}
                <br />
                Job type: {application.jobType}
              </h3>
              <button
                onClick={() => {
                  deleteJobApplication(application._id);
                }}
              >
                Delete job application
              </button>
              <button
                onClick={() => {
                  navigator("/add-Job", {
                    state: {
                      jobApplications: {
                        company: application.company,
                        position: application.position,
                        status: application.status,
                        date: application.date,
                        id: application._id,
                        location: application.location,
                        jobType: application.jobType,
                      },
                    },
                  });
                }}
              >
                Edit job application
              </button>
            </div>
          ))}
        </>
      ) : (
        <div className="no-job-yet-container">
          <h1>
            <Briefcase className="no-job-icon" />
          </h1>
          <h2>No job applications yet</h2>
          <p>
            Start tracking your job search by adding your first application.
          </p>
          <button
            onClick={() => {
              navigator("/add-job");
            }}
          >
            Add your first job application
          </button>
        </div>
      )}
    </div>
  );
}
export default Homepage;
