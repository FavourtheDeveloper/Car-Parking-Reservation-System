import React, { useState, useEffect } from "react";
import SlotCard from "./SlotCard";
import Footer from "./Footer";

export default function ParkingDashboard({ user }) {
  const [slots, setSlots] = useState([]);

  const fetchSlots = () => {
    const mockData = [
      { _id: "1", slotNumber: 1, isReserved: false, reservedBy: null },
      { _id: "2", slotNumber: 2, isReserved: true, reservedBy: { _id: "abc", username: "Someone" } },
      { _id: "3", slotNumber: 3, isReserved: true, reservedBy: { _id: user._id, username: user.username } },
      { _id: "4", slotNumber: 4, isReserved: false, reservedBy: null },
      { _id: "5", slotNumber: 5, isReserved: false, reservedBy: null },
    ];
    setSlots(mockData);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const book = id => {
    setSlots(prev =>
      prev.map(slot =>
        slot._id === id ? { ...slot, isReserved: true, reservedBy: user } : slot
      )
    );
  };

  const cancel = id => {
    setSlots(prev =>
      prev.map(slot =>
        slot._id === id ? { ...slot, isReserved: false, reservedBy: null } : slot
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"
  };

  return (
    <div>
      <div  className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">🚗 Parking Dashboard</h1>

        <div className="flex items-center gap-3 flex-wrap">
          <StatusLabel color="green-400" label="Available" />
          <StatusLabel color="red-400" label="Reserved" />
          <StatusLabel color="yellow-400" label="Yours" />

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow ml-2"
          >
            Logout
          </button>
        </div>
      </header>

      <hr className="mb-4" />

      {/* Welcome Message */}
      <div className="mb-5">
        <h2 className="text-lg font-medium text-gray-700">
          Hello, <span className="font-semibold text-blue-600">{user.username}</span>!
        </h2>
        <p className="text-sm text-gray-500">
          Select a slot to book or cancel your reservation.
        </p>
      </div>

      {/* Slot Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {slots.map(slot => (
          <SlotCard
            key={slot._id}
            slot={slot}
            onBook={book}
            onCancel={cancel}
            userId={user._id}
          />
        ))}
      </div>
</div>
      <Footer />
    </div>
  );
}

function StatusLabel({ color, label }) {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-700">
      <span className={`w-4 h-4 rounded-full bg-${color} inline-block`}></span>
      {label}
    </div>
  );
}
