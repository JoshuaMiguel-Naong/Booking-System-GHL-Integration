"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/main-layout";
import DashboardEngage from "@/components/dashboard/dashboard-engage";

export default function DashboardPage() {
  const [user, setUser] = useState<string>("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.name || parsed.email || "Guest");
      } catch {
        setUser("Guest");
      }
    }
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <DashboardEngage userName={user} />
      </div>
    </MainLayout>
  );
}
