import React from "react";

export default function SlotCard({ slot, onBook, onCancel, userId }) {
  const isReserved = slot.isReserved;
  const isMine = isReserved && slot.reservedBy?._id === userId;

  let bgColor = "bg-green-200";
  if (isReserved) bgColor = "bg-red-200";
  if (isMine) bgColor = "bg-yellow-200";

  return (
    <div
      className={`rounded-xl p-4 shadow-md ${bgColor} transition-all duration-300`}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-1">
        Slot #{slot.slotNumber}
      </h2>
      <p className="text-sm text-gray-700 mb-2">
        {isReserved
          ? isMine
            ? "You reserved this slot"
            : `Reserved by ${slot.reservedBy?.username}`
          : "Available"}
      </p>

      {!isReserved ? (
        <button
          onClick={() => onBook(slot._id)}
          className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
        >
          Book
        </button>
      ) : isMine ? (
        <button
          onClick={() => onCancel(slot._id)}
          className="w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
        >
          Cancel
        </button>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-white py-1 rounded cursor-not-allowed"
        >
          Reserved
        </button>
      )}
    </div>
  );
}
