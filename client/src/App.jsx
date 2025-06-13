import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Register from "./components/Register";
import ParkingDashboard from "./components/ParkingDashboard";
import AdminPanel from "./components/AdminPanel";
import MyBookings from "./components/MyBookings";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<ParkingDashboard user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* User-specific */}
          <Route path="/my-bookings" element={<MyBookings user={user} />} />

          {/* Admin-specific */}
          <Route path="/admin/login" element={<AdminLogin onAdminLogin={setAdmin} />} />
          <Route path="/admin/dashboard" element={admin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          <Route
            path="/admin"
            element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
