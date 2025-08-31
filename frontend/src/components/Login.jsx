import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const { user, setUser } = useContext(UserContext);
  async function handleLogin(e) {
    e.preventDefault();
    await loginUser();
    navigator("/homepage");
  }
  async function loginUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setUser({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        password: data.user.password,
        employed: data.user.employed,
      });
    } catch (error) {
      console.error(`Error while logging user: ${error}`);
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
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
