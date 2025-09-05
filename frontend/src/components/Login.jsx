import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { setUser } = useContext(UserContext);
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
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 critical // COOKIES
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
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </label>
        <br></br>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </label>
        <br></br>
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => {
            navigator("/sign-up");
          }}
        >
          Back to signup
        </button>
        <button
          type="button"
          onClick={() => {
            navigator("/");
          }}
        >
          Back to homepage
        </button>
      </form>
    </div>
  );
}
export default Login;
