import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form>
          <h1>Welcome to "Job Tracker!"</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Log in
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/sign-up");
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
export default LandingPage;
