"use client";

import React, { useState } from "react";
import CalendarHeader from "./calendar-header";
import CalendarCell from "./calendar-cell";
import { Booking } from "@/services/booking.api";

interface CalendarViewProps {
  bookings: Booking[];
  onDayClick?: (date: Date) => void; 
}

export default function CalendarView({ bookings, onDayClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <CalendarHeader month={monthName} onPrev={handlePrev} onNext={handleNext} />

      <div className="grid grid-cols-7 gap-1">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="text-center font-semibold py-1">
            {d}
          </div>
        ))}

        {/* Calendar Cells */}
        {daysInMonth.map(date => (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            bookings={bookings}
            onDayClick={onDayClick} 
          />
        ))}
      </div>
    </div>
  );
}
