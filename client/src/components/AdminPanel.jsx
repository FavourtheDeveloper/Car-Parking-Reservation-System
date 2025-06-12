import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/admin/logs").then(res => setLogs(res.data));
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Slot</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{log.username}</td>
                <td className="p-2 border">#{log.slotNumber}</td>
                <td className="p-2 border">{log.action}</td>
                <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
