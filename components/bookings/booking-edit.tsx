"use client";

import { useState, useEffect } from "react";
import { Booking, getBookingById, updateBooking } from "@/services/booking.api";

interface EditBookingFormProps {
  bookingId: string;
  onBookingUpdated?: (booking: Booking) => void;
}

export default function EditBookingForm({
  bookingId,
  onBookingUpdated,
}: EditBookingFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("Zoom");
  const [calendarId, setCalendarId] = useState("default");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<Booking["appointmentStatus"]>("pending");

  const [loading, setLoading] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);

        setTitle(data.title);
        setDescription(data.description || "");
        setAddress(data.address || "Zoom");
        setCalendarId(data.calendarId || "default");
        setStartTime(new Date(data.startTime).toISOString().slice(0, 16));
        setEndTime(new Date(data.endTime).toISOString().slice(0, 16));
        setStatus(data.appointmentStatus);
      } catch (err) {
        console.error("❌ Failed to fetch booking:", err);
      } finally {
        setLoadingBooking(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ONLY pass the local booking ID
      const updatedBooking = await updateBooking(bookingId, {
        title,
        description,
        address,
        calendarId,
        startTime,
        endTime,
        appointmentStatus: status,
      });

      onBookingUpdated?.(updatedBooking);
      alert("Booking updated successfully!");
    } catch (err: any) {
      console.error("❌ Failed to update booking:", err);
      alert(err.message || "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBooking) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700 space-y-4"
    >
      <h2 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-gray-100">
        Edit Appointments
      </h2>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-200">Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as Booking["appointmentStatus"])
          }
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
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
        {loading ? "Saving..." : "Update Booking"}
      </button>
    </form>
  );
}
