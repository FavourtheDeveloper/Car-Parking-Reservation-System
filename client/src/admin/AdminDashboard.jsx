import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import AdminBookingForm from "./AdminBookingForm";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
const [editingBooking, setEditingBooking] = useState(null); // to hold the booking being edited

const handleEdit = (booking) => {
  setEditingBooking(booking);
};

const handleDelete = async (id) => {
    if(confirm("Are you sure you wanna delete?")){
 try {
    await API.delete(`/bookings/${id}`);
    toast.success("✅ Booking deleted");
    fetchBookings();
  } catch (err) {
    toast.error("❌ Failed to delete booking");
    console.error(err);
  }
    }
 
};

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch bookings");
    }
  };

  const clearAllBookings = async () => {
    try {
      await API.delete("/bookings/clear-all");
      toast.success("🧹 All bookings cleared");
      fetchBookings();
    } catch (err) {
      toast.error("❌ Failed to clear bookings");
      console.log(err);
      
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">📋 Admin Dashboard</h1>
      <button
        onClick={clearAllBookings}
        className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear All Bookings
      </button>

      <AdminBookingForm
  refetch={fetchBookings}
  editingBooking={editingBooking}
  setEditingBooking={setEditingBooking}
/>


      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Slot Number</th>
            <th className="p-2 border">User</th>
          </tr>
        </thead>
        <tbody>
  {bookings.map((b) => (
    <tr key={b.id}>
      <td className="p-2 border">{b.slotNumber}</td>
      <td className="p-2 border">{b.User?.username || "N/A"}</td>
      <td className="p-2 border">
        <button
          onClick={() => handleEdit(b)}
          className="mr-2 bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(b.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
