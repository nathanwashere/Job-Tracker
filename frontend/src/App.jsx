import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddJob from "./components/AddJob";
import Homepage from "./components/Homepage";
import "./App.css";

export const UserContext = createContext();

function App() {
  const apiUrl = "https://job-tracker-yqn9.onrender.com";
  const apiLocal = "http://localhost:3000";
  const [user, setUser] = useState(undefined); // <-- undefined = not checked yet

  // Check JWT cookie and restore user
  async function loadUser() {
    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) setUser(null);
        else throw new Error(`Response status is --> ${response.status}`);
        return;
      }

      const data = await response.json();
      setUser(data.user || null);
    } catch (error) {
      console.error("Error restoring user from cookie:", error);
      setUser(null);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  // Don’t render routes until user is checked
  if (user === undefined) return null;

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
