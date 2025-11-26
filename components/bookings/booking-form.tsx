"use client";

import { useState } from "react";
import { createBooking, Booking } from "@/services/booking.api";

interface BookingFormProps {
  onBookingCreated?: (booking: Booking) => void;
}

export default function BookingForm({ onBookingCreated }: BookingFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("Zoom");
  const [calendarId, setCalendarId] = useState("default");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<Booking["appointmentStatus"]>("pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newBooking = await createBooking({
        title,
        description: description || undefined,
        address,
        calendarId,
        locationId: process.env.NEXT_PUBLIC_GHL_LOCATION_ID || "default-location",
        startTime,
        endTime,
        appointmentStatus: status,
        userId: "", 
      });

      onBookingCreated?.(newBooking);

      // Reset form
      setTitle("");
      setDescription("");
      setAddress("Zoom");
      setCalendarId("default");
      setStartTime("");
      setEndTime("");
      setStatus("pending");
    } catch (err: any) {
      console.error("Failed to create booking:", err);
      alert(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700 space-y-4"
    >
      <h2 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-gray-100">
        Set Appointments
      </h2>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Booking["appointmentStatus"])}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:ring-1 focus:ring-blue-500 outline-none"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {loading ? "Saving..." : "Add Booking"}
      </button>
    </form>
  );
}
