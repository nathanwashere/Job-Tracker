import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Briefcase } from "lucide-react";
import { Clock } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";
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
  const [filter, setFilter] = useState("all"); // <- define filter state
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
          </div>

          <div className="applications-list">
            {jobApplications
              .filter(
                (app) => filter === "all" || app.status.toLowerCase() === filter
              )
              .map((app) => (
                <div key={app.id} className="application-card">
                  <div className="app-info">
                    <h3>
                      {app.position} @ {app.company}
                    </h3>
                    <p>Applied on {formatDate(app.date)}</p>
                    <p>Status: {app.status}</p>
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
                            },
                          },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteJobApplication(app.id)}>
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
