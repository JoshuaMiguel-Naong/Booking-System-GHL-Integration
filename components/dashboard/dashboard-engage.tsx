"use client";

import { useRouter } from "next/navigation";

interface DashboardEngageProps {
  userName: string;
}

export default function DashboardEngage({ userName }: DashboardEngageProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 rounded-xl shadow p-6 mb-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, {userName} 👋
      </h1>
      <p className="text-gray-300 mb-4">
        Manage your bookings efficiently. View upcoming appointments, track booking statuses, and stay organized.
      </p>
      <button
        onClick={() => router.push("/bookings")}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        Add New Booking
      </button>
    </div>
  );
}
