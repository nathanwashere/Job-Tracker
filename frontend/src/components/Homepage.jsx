import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const statuses = [
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Ghosted", value: "ghosted" },
  ];
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState(formatDate(Date.now()));
  const [status, setStatus] = useState("pending");
  const navigator = useNavigate();
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  async function handleJobApplication(e) {
    e.preventDefault();
    await jobApplication();
  }
  async function jobApplication() {
    try {
      const response = await fetch(
        "http://localhost:3000/job-application/create",
        {
          method: "POST",
          body: JSON.stringify({ user, company, position, date, status }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.message}`);
      }
    } catch (error) {
      console.error(`Error while trying to save job application : ${error}`);
    }
  }
  return (
    <div>
      <h1>
        Welcome {user.firstName} {user.lastName}!
      </h1>
      <div>
        <form
          onSubmit={(e) => {
            handleJobApplication(e);
          }}
        >
          <label>
            Company name:
            <input
              type="text"
              placeholder="Company name"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
            />
          </label>
          <br />
          <label>
            Poistion at the company:
            <input
              type="text"
              placeholder="Poistion"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              value={position}
            />
          </label>
          <br />
          <label>
            Status of application:
            <select
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              value={status}
            >
              <option value="">--Select a status--</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Date of submission
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </label>
          <br />
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
}
export default Homepage;
