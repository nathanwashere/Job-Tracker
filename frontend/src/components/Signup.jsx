import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigator = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await createUser();

      toast.success("User has successfully signed up!");
      setUser({
        id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        passsword: data.user.password,
        employed: data.user.employed,
      });
      navigator("/homepage");
    } catch (error) {
      console.error(`Error while trying to sign up : ${error}`);
      toast.error("Wrong input!");
    }
  };
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
        credentials: "include", // 👈 critical // COOKIES
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(`Error while creating a new user: ${error}`);
      throw error;
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
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
