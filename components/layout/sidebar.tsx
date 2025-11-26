"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Appointments", href: "/bookings" },
  { name: "Calendar", href: "/calendar" },
  { name: "Contacts", href: "/ghl/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
              pathname === item.href ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
