import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Briefcase } from "lucide-react";
import { Clock } from "lucide-react";
import { Calendar, MapPin } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "../style/Homepage.css";
function Homepage() {
  //#region Const variables
  const apiUrl = "https://job-tracker-yqn9.onrender.com";
  const apiLocal = "http://localhost:3000";
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const totalApplications = jobApplications.length;
  const pendingCount = jobApplications.filter(
    (app) => app.status === "Pending"
  ).length;
  const acceptedCount = jobApplications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const ghostedCount = jobApplications.filter(
    (app) => app.status === "Ghosted"
  ).length;
  const rejectedCount = jobApplications.filter(
    (app) => app.status === "Rejected"
  ).length;
  const interviewRejectedCount = jobApplications.filter(
    (app) => app.status === "Interview Rejected"
  ).length;
  const [filter, setFilter] = useState("all"); // <- define filter state
  //#endregion
  //#region Functions
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
      const response = await fetch(`${apiUrl}/job-application/find-all`, {
        credentials: "include", // important for cookies
      });
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
      const response = await fetch(`${apiUrl}/job-application/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
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
      const response = await fetch(`${apiUrl}/auth/logout`, {
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
    if (!user) return;

    async function fetchJobs() {
      const apps = await getJobApplicationsForCurrentUser();
      setJobApplications(apps || []);
      setJobsLoaded(true);
    }

    fetchJobs();
  }, [user]);
  //#endregion

  if (!jobsLoaded) return null; // render nothing until jobs are loaded
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
          <div className="summary-and-filters">
            <div className="summary-cards">
              <div className="summary-card">
                <div className="card-top">
                  <span>Total Applications</span>
                  <i className="card-icon">
                    <Briefcase style={{ color: "blue" }} size={17} />
                  </i>
                </div>
                <div className="card-number">{totalApplications}</div>
              </div>

              <div className="summary-card">
                <div className="card-top">
                  <span>Pending</span>
                  <i className="card-icon">
                    <Clock style={{ color: "orange" }} size={17} />
                  </i>
                </div>
                <div className="card-number">{pendingCount}</div>
              </div>

              <div className="summary-card">
                <div className="card-top">
                  <span>Rejected</span>
                  <i className="card-icon">
                    <CircleX style={{ color: "red" }} size={17} />
                  </i>
                </div>
                <div className="card-number">{rejectedCount}</div>
              </div>

              <div className="summary-card">
                <div className="card-top">
                  <span>Accepted</span>
                  <i className="card-icon">
                    <CircleCheckBig style={{ color: "green" }} size={17} />
                  </i>
                </div>
                <div className="card-number">{acceptedCount}</div>
              </div>

              <div className="summary-card">
                <div className="card-top">
                  <span>Ghosted</span>
                  <i className="card-icon">
                    <MessageCircleQuestionMark
                      style={{ color: "black" }}
                      size={17}
                    />
                  </i>
                </div>
                <div className="card-number">{ghostedCount}</div>
              </div>

              <div className="summary-card">
                <div className="card-top">
                  <span>Interview Rejected</span>
                  <i className="card-icon">
                    <CircleX style={{ color: "purple" }} size={17} />
                  </i>
                </div>
                <div className="card-number">{interviewRejectedCount}</div>
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All ({totalApplications})
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending ({pendingCount})
            </button>
            <button
              className={filter === "ghosted" ? "active" : ""}
              onClick={() => setFilter("ghosted")}
            >
              Ghosted ({ghostedCount})
            </button>
            <button
              className={filter === "accepted" ? "active" : ""}
              onClick={() => setFilter("accepted")}
            >
              Accepted ({acceptedCount})
            </button>
            <button
              className={filter === "rejected" ? "active" : ""}
              onClick={() => setFilter("rejected")}
            >
              Rejected ({rejectedCount})
            </button>
            <button
              className={filter === "interview rejected" ? "active" : ""}
              onClick={() => setFilter("interview rejected")}
            >
              Interview Rejected ({interviewRejectedCount})
            </button>
          </div>

          <div className="applications-list">
            {jobApplications
              .filter(
                (app) => filter === "all" || app.status.toLowerCase() === filter
              )
              .map((app) => (
                <div key={app._id} className="application-card">
                  <div className="app-header">
                    <div className="app-title">
                      <div className="position-name">{app.position}</div>
                      <div className="company-name">{app.company}</div>
                    </div>
                    <span
                      className={`status-pill status-${(
                        app.status || ""
                      ).toLowerCase()}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="app-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>Applied on {formatDate(app.date)}</span>
                    </div>
                    {app.location && (
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{app.location}</span>
                      </div>
                    )}
                    {app.jobType && (
                      <div className="meta-item">
                        <Briefcase size={16} />
                        <span>{app.jobType}</span>
                      </div>
                    )}
                  </div>

                  <div className="app-actions">
                    <button
                      onClick={() =>
                        navigator("/add-job", {
                          state: {
                            jobApplications: {
                              company: app.company,
                              position: app.position,
                              status: app.status,
                              date: app.date,
                              id: app._id,
                              jobType: app.jobType,
                              location: app.location,
                            },
                          },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteJobApplication(app._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
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
