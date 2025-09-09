import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
import { Briefcase, User, Mail, Lock, Building } from "lucide-react";
import "../style/Signup.css";

function Signup() {
  //#region Const variables
  const apiUrl = "https://job-tracker-yqn9.onrender.com";
  const apiLocal = "http://localhost:3000";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigator = useNavigate();
  //#endregion
  //#region Functions
  function validateSignup({ firstName, lastName, email, password }) {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const asciiRegex = /^[\x00-\x7F]+$/; // only English characters/symbols

    if (!nameRegex.test(firstName)) {
      return "First name must contain only English letters";
    }
    if (!nameRegex.test(lastName)) {
      return "Last name must contain only English letters";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    if (!asciiRegex.test(password)) {
      return "Password must contain only English letters, numbers, or symbols";
    }

    return null;
  }

  function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const error = validateSignup({ firstName, lastName, email, password });

    if (error) {
      toast.error(error);
      return;
    }

    // 📝 Normalize names before sending
    const formattedFirstName = formatName(firstName);
    const formattedLastName = formatName(lastName);

    try {
      const data = await createUser({
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email: email.toLowerCase(),
        password,
        isEmployed,
      });

      toast.success("Account created successfully!");
      setUser({
        id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        password: data.user.password,
        employed: data.user.employed,
      });
      console.log("New user:", data);
      navigator("/homepage");
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error.message);
    }
  };

  async function createUser({
    firstName,
    lastName,
    email,
    password,
    isEmployed,
  }) {
    const response = await fetch(`${apiUrl}/auth/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        isEmployed,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      let errMsg = `Something went wrong (${response.status})`;

      try {
        const errorData = await response.json();
        if (errorData.message) errMsg = errorData.message;
      } catch {
        // ignore parse errors
      }

      throw new Error(errMsg);
    }

    return response.json();
  }

  //#endregion
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-title">
            <Briefcase
              size={32}
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            Join Job Tracker
          </div>
          <p className="signup-subtitle">
            Create your account and start tracking your job applications
          </p>
        </div>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <User
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                First Name
              </label>
              <input
                type="text"
                className="form-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <User
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Last Name
              </label>
              <input
                type="text"
                className="form-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">
              <Mail
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Email Address
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">
              <Lock
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Password
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="employed"
              className="checkbox-input"
              checked={isEmployed}
              onChange={(e) => setIsEmployed(e.target.checked)}
            />
            <label htmlFor="employed" className="checkbox-label">
              <Building
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              I am currently employed
            </label>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <div className="divider"></div>

        <div className="form-links">
          <button
            type="button"
            className="link-button"
            onClick={() => navigator("/login")}
          >
            Already have an account? Sign in here
          </button>

          <button
            type="button"
            className="link-button"
            onClick={() => navigator("/")}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
