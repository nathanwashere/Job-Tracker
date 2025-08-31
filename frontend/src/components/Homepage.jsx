import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();
  console.log(user);
  return (
    <div>
      <h1>
        Welcome {user.firstName} {user.lastName}!
      </h1>
    </div>
  );
}
export default Homepage;
