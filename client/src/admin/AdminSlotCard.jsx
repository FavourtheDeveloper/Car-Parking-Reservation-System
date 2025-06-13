import React from "react";

export default function AdminSlotCard({ slot, onCancel }) {
  const { slotNumber, isReserved, reservedBy, bookingId } = slot;

  return (
    <div className="p-4 bg-white rounded shadow border">
      <h3 className="font-bold text-lg">Slot {slotNumber}</h3>
      <p className="text-sm mt-1">
        Status:{" "}
        <span
          className={`font-semibold ${
            isReserved ? "text-red-500" : "text-green-600"
          }`}
        >
          {isReserved ? "Reserved" : "Available"}
        </span>
      </p>
      {reservedBy && (
        <p className="text-xs text-gray-600">By: {reservedBy.username}</p>
      )}

      {isReserved && (
        <button
          className="mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => onCancel(bookingId)}
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
