import React, { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ParkingDashboard from "./components/ParkingDashboard";

function App() {
  const [user, setUser] = useState({ _id: "abc123", username: "TestUser", role: "user" }); // Mock user state

  const mockLogin = () => {
    // You can simulate role: 'admin' or 'user'
    setUser({ username: "JohnDoe", _id: "123", role: "user" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
  <Router>
        <Routes>
          <Route path="/dashboard" element={<ParkingDashboard user={user} />} />
          <Route
            path="/"
            element={
              <Login onLogin={mockLogin} />
            }
          />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      
    </Router>
  );
}

export default App;
