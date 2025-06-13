import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get(`/bookings/user/${user.id}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("❌ Could not fetch your bookings");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await API.delete(`/bookings/${bookingId}`);
      toast.success("🚫 Booking canceled");
      fetchMyBookings();
    } catch (err) {
      console.error("Cancel failed:", err);
      toast.error("❌ Failed to cancel booking");
    }
  };

  useEffect(() => {
    if (user) fetchMyBookings();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-6 text-red-500">Please login to view your bookings.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You haven’t booked any slots yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  Slot #{booking.slotNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  Booked by: {booking.User?.username}
                </p>
              </div>
              <button
                onClick={() => cancelBooking(booking.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
