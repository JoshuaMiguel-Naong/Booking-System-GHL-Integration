"use client";

import React from "react";

interface CalendarHeaderProps {
  month: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ month, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrev}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <h2 className="text-xl font-bold">{month}</h2>
      <button
        onClick={onNext}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        →
      </button>
    </div>
  );
}
