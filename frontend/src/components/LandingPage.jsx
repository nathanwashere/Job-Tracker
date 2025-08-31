import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Welcome to "Job Tracker!"</h1>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
        <button
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
export default LandingPage;
