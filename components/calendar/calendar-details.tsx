"use client";

import React from "react";
import { Booking } from "@/services/booking.api";

interface BookingDetailSidebarProps {
  bookings: Booking[];
  onClose: () => void;
}

export default function BookingDetailSidebar({ bookings, onClose }: BookingDetailSidebarProps) {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gray-900 text-white shadow-lg z-50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Appointments</h2>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>

      {/* Booking Cards */}
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
          >
            <p><strong>Title:</strong> {booking.title}</p>
            <p><strong>Start:</strong> {new Date(booking.startTime).toLocaleDateString()}</p>
            <p><strong>End:</strong> {new Date(booking.endTime).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {booking.description || "N/A"}</p>
            <p><strong>Status:</strong> {booking.appointmentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
