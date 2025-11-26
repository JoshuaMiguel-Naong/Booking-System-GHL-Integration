"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/main-layout";
import SummaryCards from "@/components/bookings/booking-card";
import BookingTable from "@/components/bookings/booking-table";
import { fetchMyBookings, Booking } from "@/services/booking.api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        const bookingsArray = Array.isArray(data) ? data : [];

        const normalized: Booking[] = bookingsArray.map((b: any) => ({
          id: b.id,
          userId: b.userId,
          title: b.title,
          description: b.description,
          address: b.address,
          calendarId: b.calendarId,
          locationId: b.locationId,
          startTime: b.startTime,
          endTime: b.endTime,
          appointmentStatus:
            (b.appointmentStatus?.toLowerCase() as Booking["appointmentStatus"]) ||
            "pending",
          ghlContactId: b.ghlContactId,
          ghlAppointmentId: b.ghlAppointmentId,
        }));

        setBookings(normalized);
      } catch (err: any) {
        console.error("Failed to fetch bookings:", err);
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p className="p-6 text-gray-100">Loading bookings...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="p-6 text-red-500">{error}</p>
      </MainLayout>
    );
  }

  const total = bookings.length;
  const pending = bookings.filter((b) => b.appointmentStatus === "pending").length;
  const confirmed = bookings.filter((b) => b.appointmentStatus === "confirmed").length;
  const cancelled = bookings.filter((b) => b.appointmentStatus === "cancelled").length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <SummaryCards
          total={total}
          pending={pending}
          confirmed={confirmed}
          cancelled={cancelled}
        />

        {/* Booking Table */}
        <BookingTable
          bookings={bookings}
          setBookings={setBookings} 
        />
      </div>
    </MainLayout>
  );
}
