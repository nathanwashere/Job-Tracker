import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import "../style/AddJob.css";
function AddJob() {
  //#region Const variables
  const apiUrl = "https://job-tracker-yqn9.onrender.com";
  const apiLocal = "http://localhost:3000";
  const statuses = [
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "Ghosted", value: "Ghosted" },
  ];
  const uLocation = useLocation();
  const navigator = useNavigate();
  const { jobApplications } = uLocation.state || {};
  const [idJobApplication, setIdJobApplication] = useState(
    jobApplications ? jobApplications.id : null
  );
  const [company, setCompany] = useState(
    jobApplications ? jobApplications.company : ""
  );
  const [position, setPosition] = useState(
    jobApplications ? jobApplications.position : ""
  );
  const [date, setDate] = useState(
    jobApplications ? formatDate(jobApplications.date) : formatDate(Date.now())
  );
  const [status, setStatus] = useState(
    jobApplications ? jobApplications.status : null
  );
  const [location, setLocation] = useState(
    jobApplications ? jobApplications.location : ""
  );
  const [jobType, setJobType] = useState(
    jobApplications ? jobApplications.jobType : ""
  );
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
  function validateJob({ company, position, location, jobType }) {
    if (!company.trim()) return "Company is required";
    if (!position.trim()) return "Position is required";
    if (!location.trim()) return "Location is required";
    if (!jobType.trim()) return "Job type is required";

    return null; // ✅ all valid
  }
  const handleJobApplication = async (e) => {
    e.preventDefault();

    const error = validateJob({ company, position, location, jobType });
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const response = await createJobApplication();
      if (!response.ok) {
        throw new Error(`Error! Failed with status --> ${response.status}`);
      }
      toast.success("Job application submitted successfully!");
      navigator("/homepage");
    } catch (error) {
      toast.error("Failed to submit an application.");
      console.error(`Error while trying to save job application: ${error}`);
    }
  };
  async function createJobApplication() {
    try {
      const response = await fetch(`${apiUrl}/job-application/create`, {
        method: "POST",
        body: JSON.stringify({
          company,
          position,
          date,
          status: status || "Pending",
          location,
          jobType,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      return response;
    } catch (error) {
      console.error(`Error while trying to save job application: ${error}`);
      throw error;
    }
  }
  async function editJobApplication() {
    try {
      const response = await fetch(`${apiUrl}/job-application/edit`, {
        method: "PATCH",
        body: JSON.stringify({
          company,
          position,
          date,
          status: status || null,
          idJobApplication,
          location,
          jobType,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      toast.success("Job application edited successfully!");
      navigator("/homepage");
    } catch (error) {
      toast.error("Failed to edit job application!");
      console.error(`Error while trying to edit job application --> ${error}`);
    }
  }
  //#endregion
  return (
    <div className="form-wrapper">
      <form onSubmit={handleJobApplication} className="form">
        <label>
          Company *
          <input
            type="text"
            placeholder="Company name"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            value={company}
          />
        </label>
        <label>
          Position *
          <input
            type="text"
            placeholder="Job title"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            value={position}
          />
        </label>
        <label>
          Status
          <Select
            options={statuses} // array of { value, label }
            value={statuses.find((option) => option.value === status) || null} // display selected
            onChange={(selectedOption) =>
              setStatus(selectedOption ? selectedOption.value : null)
            }
            placeholder="Select a status"
            isClearable
          />
        </label>
        <label>
          Date Applied
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label>
          Location
          <input
            type="string"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
            placeholder="City,Stae or Remote"
          ></input>
        </label>
        <label>
          Job Type
          <input
            type="string"
            onChange={(e) => {
              setJobType(e.target.value);
            }}
            value={jobType}
            placeholder="Full time, Part time"
          ></input>
        </label>
        <div className="form-actions">
          {jobApplications ? (
            <button type="button" onClick={editJobApplication}>
              Save application
            </button>
          ) : (
            <button type="submit">Add application</button>
          )}
          <button
            type="button"
            onClick={() => {
              navigator("/homepage");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddJob;
