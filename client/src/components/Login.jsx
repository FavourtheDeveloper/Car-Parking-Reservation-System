import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    onLogin();
    // try {
    //   const res = await API.post("/auth/login", { username, password });
    //   localStorage.setItem("token", res.data.token);
    //   onLogin();
    // } catch (err) {
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
       <Link to={'/dashboard'}> <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button></Link>
      </form>
    </div>
  );
}
