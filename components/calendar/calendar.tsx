"use client";

import React, { useEffect, useState } from "react";
import CalendarView from "./calendar-view";
import BookingDetailSidebar from "./calendar-details";
import { fetchMyBookings, Booking } from "@/services/booking.api";

export default function CalendarContainer() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const handleDayClick = (date: Date) => {
    const dayBookings = bookings.filter(
      b => new Date(b.date).toDateString() === date.toDateString()
    );
    setSelectedBookings(dayBookings);
  };

  const handleCloseSidebar = () => setSelectedBookings([]);

  if (loading) return <div>Loading Appointments...</div>;

  return (
    <div className="flex w-full min-h-screen">
      <div className={`flex-1 transition-all duration-300 ${selectedBookings.length ? "mr-96" : ""}`}>
        <CalendarView bookings={bookings} onDayClick={handleDayClick} />
      </div>

      {selectedBookings.length > 0 && (
        <BookingDetailSidebar bookings={selectedBookings} onClose={handleCloseSidebar} />
      )}
    </div>
  );
}
