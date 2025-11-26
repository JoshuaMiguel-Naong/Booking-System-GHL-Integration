"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/main-layout";
import CalendarView from "@/components/calendar/calendar-view";
import BookingDetailSidebar from "@/components/calendar/calendar-details";
import { fetchMyBookings, Booking } from "@/services/booking.api";

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleOpenSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  if (loading)
    return (
      <MainLayout>
        <p className="p-6">Loading...</p>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout>
        <p className="p-6 text-red-500">{error}</p>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="flex w-full min-h-screen gap-4">
        {/* Calendar */}
        <div className={`flex-1 transition-all duration-300 ${showSidebar ? "mr-96" : ""}`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Bookings Calendar</h1>
            <button
              onClick={handleOpenSidebar}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show All Appoinntments
            </button>
          </div>
          <CalendarView bookings={bookings} />
        </div>

        {/* Sidebar shows all bookings */}
        {showSidebar && (
          <BookingDetailSidebar bookings={bookings} onClose={handleCloseSidebar} />
        )}
      </div>
    </MainLayout>
  );
}
