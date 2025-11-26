export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("❌ Cannot find API URL");

const BASE_URL = `${API_URL}/auth`;

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const data: AuthResponse = await res.json();

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function fetchBookings(): Promise<any[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch bookings");
  }

  return res.json();
}
