import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();
    await createUser();
    navigator("/homepage");
  }
  async function createUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          isEmployed,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setUser({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        passsord: data.user.password,
        employed: data.user.employed,
      });
    } catch (error) {
      console.error(`Error while creating a new user: ${error}`);
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSignup(e);
        }}
      >
        <label>
          First name:
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Last name:
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Employed?:
          <label>
            Yes
            <input
              type="radio"
              name="employed"
              onChange={() => {
                setIsEmployed(true);
              }}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="employed"
              onChange={() => {
                setIsEmployed(false);
              }}
            />
          </label>
        </label>
        <br />
        <button type="submit">Sign up</button>
        <button
          type="button"
          onClick={() => {
            navigator("/login");
          }}
        >
          Back to login
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
export default Signup;
