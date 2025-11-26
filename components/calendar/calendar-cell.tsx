"use client";

import React from "react";
import { Booking } from "@/services/booking.api";
import "../../styles/calendar.css";

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function bookingColor(id: string) {
  const h = hashString(id) % 360;
  return `hsl(${h}, 70%, 60%)`;
}

interface CalendarCellProps {
  date: Date;
  bookings: Booking[];
  onDayClick?: (date: Date) => void;
}

export default function CalendarCell({ date, bookings, onDayClick }: CalendarCellProps) {
  const day = date.getDate();

  // Match bookings based on startTime occurring on the same date
  const dayBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.startTime);
    return bookingDate.toDateString() === date.toDateString();
  });

  return (
    <div onClick={() => onDayClick?.(date)} className="calendar-cell">
      <span className="day-number">{day}</span>

      <div className="mt-1 flex flex-col gap-0.5">
        {dayBookings.map((b) => {
          const start = new Date(b.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const end = new Date(b.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={b.id}
              className="booking-item"
              style={{ backgroundColor: bookingColor(b.id) }}
            >
              <span className="truncate">{b.title}</span>

              <div className="tooltip">
                <div>
                  <strong>Title:</strong> {b.title}
                </div>
                <div>
                  <strong>Time:</strong> {start} - {end}
                </div>
                <div>
                  <strong>Address:</strong> {b.address || "N/A"}
                </div>
                <div>
                  <strong>Status:</strong> {b.appointmentStatus}
                </div>
                {b.description && (
                  <div>
                    <strong>Description:</strong> {b.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
