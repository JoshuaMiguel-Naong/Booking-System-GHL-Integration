"use client";

import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import AuthEngage from "../layout/auth-engage";
import AuthForm from "../layout/auth-form";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);

      document.cookie = `token=${data.accessToken}; path=/; max-age=86400`; 
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 p-6 gap-8">
      <AuthEngage
        title="Welcome to Your Booking Hub"
        description="Easily manage all your appointments, track booking statuses, and keep your schedule organized. Log in to continue or register if you're new."
        buttonText="Create an Account"
        onClick={() => router.push("/register")}
      />
      <AuthForm title="Login" submitText="Login" onSubmit={handleLogin} />
    </main>
  );
}
