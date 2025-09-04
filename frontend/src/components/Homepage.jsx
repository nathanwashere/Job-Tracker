import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Homepage.css";
function Homepage() {
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();
  const [jobApplications, setJobApplications] = useState([]);
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
      <h1>
        Welcome {user.firstName} {user.lastName}!
      </h1>
      {jobApplications.length ? (
        <>
          <h2>Your job applications are:</h2>
          {jobApplications.map((application) => (
            <div key={application._id} className="job-application-container">
              <h3>
                Company: {application.company}
                <br />
                Position: {application.position}
                <br />
                Status: {application.status}
              </h3>
              <button
                onClick={async () => {
                  await deleteJobApplication(application._id);
                }}
              >
                Delete job application
              </button>
            </div>
          ))}
        </>
      ) : (
        <h2>You have no job applications yet!</h2>
      )}
      <button
        onClick={() => {
          navigator("/add-job");
        }}
      >
        Add a job application
      </button>

      <br />
      <button
        onClick={() => {
          toast.success("You have been logged out!", {
            onClose: async () => {
              await logOutUser();
            },
          });
        }}
      >
        Log out
      </button>
    </div>
  );
}
export default Homepage;
