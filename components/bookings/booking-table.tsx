"use client";

import React, { useState } from "react";
import BookingForm from "./booking-form";
import EditBookingForm from "./booking-edit";
import { Booking, deleteBooking } from "@/services/booking.api";

interface BookingTableProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export default function BookingTable({
  bookings,
  setBookings,
}: BookingTableProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleEditClick = (booking: Booking) => {
    setEditingBooking(booking);
    setShowEditModal(true);
  };

  const handleDelete = async (booking: Booking) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the booking "${booking.title}"?`
  );
  if (!confirmDelete) return;

  try {
    if (booking.ghlAppointmentId) {
      await deleteBooking(booking.ghlAppointmentId);
    }

    await deleteBooking(booking.id);
    setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    if (editingBooking?.id === booking.id) setShowEditModal(false);
  } catch (err: any) {
    console.error("Failed to delete booking:", err);
    alert(err.message || "Failed to delete booking");
  }
};


  return (
    <div className="w-full border border-gray-700 rounded-xl p-4 shadow-lg bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Appointments</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Set Appointments
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="p-3 text-left text-gray-200">Title</th>
              <th className="p-3 text-left text-gray-200">Description</th>
              <th className="p-3 text-left text-gray-200">Address</th>
              <th className="p-3 text-left text-gray-200">StartTime</th>
              <th className="p-3 text-left text-gray-200">EndTime</th>
              <th className="p-3 text-left text-gray-200">Status</th>
              <th className="p-3 text-left text-gray-200">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">{item.address}</td>
                  <td className="p-3">{item.startTime}</td>
                  <td className="p-3">{item.endTime}</td>
                  <td className="p-3">{item.appointmentStatus}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  No Appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 relative text-gray-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-lg"
              onClick={() => setShowAddModal(false)}
            >
              ✖
            </button>
            <BookingForm
              onBookingCreated={(newBooking) => {
                setBookings((prev) => [...prev, newBooking]);
                setShowAddModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {showEditModal && editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 relative text-gray-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-lg"
              onClick={() => setShowEditModal(false)}
            >
              ✖
            </button>
            <EditBookingForm
              bookingId={editingBooking.id}
              onBookingUpdated={(updated) => {
                setBookings((prev) =>
                  prev.map((b) => (b.id === updated.id ? updated : b))
                );
                setShowEditModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
