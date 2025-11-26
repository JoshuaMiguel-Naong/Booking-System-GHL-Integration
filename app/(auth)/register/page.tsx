"use client";

import { useRouter } from "next/navigation";
import AuthEngage from "../layout/auth-register-engage";
import AuthRegisterForm from "../layout/auth-register-form";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "Registration failed");
    }

    // After successful registration, redirect to login
    router.push("/login");
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 p-6 gap-8">
      <AuthEngage
        title="Join Our Booking Hub"
        description="Create your account to start managing appointments efficiently. Track bookings, update schedules, and stay organized all in one place."
        buttonText="Already have an account? Login"
        onClick={() => router.push("/login")}
      />
      <AuthRegisterForm onSubmit={handleRegister} />
    </main>
  );
}
