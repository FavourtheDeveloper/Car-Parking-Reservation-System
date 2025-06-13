import React, { useState, useEffect } from "react";
import SlotCard from "./SlotCard";
import Footer from "./Footer";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

export default function ParkingDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/bookings");
      const bookings = await res.data;

      const allSlots = Array.from({ length: 10 }, (_, i) => {
        const found = bookings.find((b) => b.slotNumber === i + 1);
        return {
          _id: String(i + 1),
          slotNumber: i + 1,
          isReserved: !!found,
          reservedBy: found ? found.User : null,
          bookingId: found ? found.id : null,
        };
      });

      setSlots(allSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const attemptBook = (id) => {
    if (!user) {
      alert("Please Login to Book a Slot");
      navigate("/login");
    } else {
      setSelectedSlotId(id);
      setShowModal(true);
    }
  };

  const confirmBook = async () => {
    try {
      const res = await API.post("/bookings", {
        slotNumber: parseInt(selectedSlotId),
        userId: user.id,
      });

      toast.success("✅ Slot successfully booked!", {
        position: "top-right",
        autoClose: 3000,
      });

      setShowModal(false);
      setSelectedSlotId(null);
      fetchSlots(); // Refresh slot list
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      toast.error("❌ Failed to book slot");
    }
  };

  const cancel = async (id) => {
    const slot = slots.find((s) => s._id === id);
    if (slot?.bookingId) {
      try {
        await fetch(`/api/bookings/${slot.bookingId}`, {
          method: "DELETE",
        });
        toast.success("🚫 Booking canceled!");
        fetchSlots();
      } catch (err) {
        console.error("Cancel failed:", err);
        toast.error("❌ Failed to cancel booking");
      }
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🚗 Parking Dashboard
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <StatusLabel color="green-400" label="Available" />
            <StatusLabel color="red-400" label="Reserved" />
            <StatusLabel color="yellow-400" label="Yours" />

            {user && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                >
                  My Bookings
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <hr className="mb-4" />

        <div className="mb-5">
          <h2 className="text-lg font-medium text-gray-700">
            Hello,{" "}
            <span className="font-semibold text-blue-600">
              {user ? user.username : "Guest"}
            </span>
            !
          </h2>
          <p className="text-sm text-gray-500">
            Select a slot to book or cancel your reservation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {slots.map((slot) => (
            <SlotCard
              key={slot._id}
              slot={slot}
              onBook={attemptBook}
              onCancel={cancel}
              userId={user?.id}
              isGuest={!user}
            />
          ))}
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onConfirm={confirmBook}
        onCancel={() => setShowModal(false)}
      />

      <Footer />
    </div>
  );
}

function StatusLabel({ color, label }) {
  const colorClasses = {
    "green-400": "bg-green-400",
    "red-400": "bg-red-400",
    "yellow-400": "bg-yellow-400",
  };

  return (
    <div className="flex items-center gap-1 text-sm text-gray-700">
      <span
        className={`w-4 h-4 rounded-full inline-block ${colorClasses[color]}`}
      ></span>
      {label}
    </div>
  );
}
