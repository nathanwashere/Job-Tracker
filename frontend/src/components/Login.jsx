import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
import { Briefcase, Mail, Lock } from "lucide-react";
import "../style/Login.css";

function Login() {
  const apiUrl = "https://job-tracker-yqn9.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    console.log("API URL being used (client-side):", apiUrl);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser();
      toast.success("User has successfully logged in!");
      setUser({
        id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        password: data.user.password,
        employed: data.user.employed,
      });
      navigator("/homepage");
    } catch (error) {
      console.error(`Error while logging in user: ${error}`);
      toast.error("Email or password not valid!");
    }
  };

  async function loginUser() {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error while logging user: ${error}`);
      throw error;
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-title">
            <Briefcase
              size={32}
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            Welcome Back
          </div>
          <p className="login-subtitle">
            Sign in to continue tracking your job applications
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
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

          <div className="form-group">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="divider"></div>

        <div className="form-links">
          <button
            type="button"
            className="link-button"
            onClick={() => navigator("/sign-up")}
          >
            Don't have an account? Sign up here
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

export default Login;
