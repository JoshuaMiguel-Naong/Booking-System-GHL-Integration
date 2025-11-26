"use client";

import React from "react";

interface SummaryCardsProps {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export default function SummaryCards({
  total,
  confirmed,
  pending,
  cancelled,
}: SummaryCardsProps) {
  const stats = [
    { label: "Total Bookings", value: total },
    { label: "Confirmed", value: confirmed },
    { label: "Pending", value: pending },
    { label: "Cancelled", value: cancelled },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      {stats.map((card, idx) => (
        <div
          key={idx}
          className="p-4 bg-white border rounded-lg shadow-sm text-center"
        >
          <h3 className="text-sm text-gray-500">{card.label}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
