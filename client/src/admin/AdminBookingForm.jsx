import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function AdminBookingForm({ refetch, editingBooking, setEditingBooking }) {
  const [slotNumber, setSlotNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  // Populate form when editing
  useEffect(() => {
    if (editingBooking) {
      setSlotNumber(editingBooking.slotNumber);
      setUserId(editingBooking.userId);
    } else {
      setSlotNumber("");
      setUserId("");
    }
  }, [editingBooking]);

  // Fetch user list for dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/bookings/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("❌ Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slotNumber || !userId) {
      toast.error("❌ All fields are required");
      return;
    }

    try {
      if (editingBooking) {
        // Update existing booking
        await API.put(`/bookings/${editingBooking.id}`, { slotNumber, userId });
        toast.success("✅ Booking updated");
        setEditingBooking(null);
      } else {
        // Create new booking
        await API.post("/bookings", { slotNumber, userId });
        toast.success("✅ Booking created");
      }
      setSlotNumber("");
      setUserId("");
      refetch();
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.error || "Failed to submit booking"}`);
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setSlotNumber("");
    setUserId("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-semibold mb-4">
        {editingBooking ? "✏️ Edit Booking" : "➕ Add Booking"}
      </h2>

      <div className="mb-3">
        <label className="block mb-1">Slot Number:</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={slotNumber}
          onChange={(e) => setSlotNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">User:</label>
        <select
          className="w-full border p-2 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingBooking ? "Update" : "Create"}
        </button>

        {editingBooking && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
