import React from "react";

export default function SlotCard({ slot, onBook, onCancel, userId, isGuest }) {
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
            ? "This slot has been reserved"
            : `Reserved by ${slot.reservedBy?.username}`
          : "Available"}
      </p>

      {!isReserved ? (
        <button
          onClick={() => onBook(slot._id)} // let it trigger login redirect
          className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
        >
          Book
        </button>
      ) : isMine ? (
        <button
          onClick={() => onCancel(slot._id)}
          disabled={isGuest} // guests can't cancel
          className={`w-full py-1 rounded text-white ${
            isGuest
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          title={isGuest ? "You can not cancel booking" : ""}
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
