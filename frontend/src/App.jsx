import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddJob from "./components/AddJob";
import Homepage from "./components/Homepage";
import "./App.css";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  async function loadUser() {
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status is --> ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      if (error.message.includes("401")) {
        setUser(null);
      } else {
        console.error("Error restoring user from cookie:", error);
      }
    }
  }
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="homepage" /> : <LandingPage />}
          />
          <Route
            path="homepage"
            element={user ? <Homepage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/add-job"
            element={user ? <AddJob /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
