"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface StoredUser {
  id: string;
  firstName: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed: StoredUser = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="w-full bg-gray-900 shadow px-6 py-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-semibold">Booking System</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-lg font-medium">
  Hello, {user?.firstName || user?.email || "Guest"} 👋
</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
