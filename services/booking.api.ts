export interface Booking {
  id: string;
  userId: string;
  title: string;
  description?: string;
  address: string;       
  calendarId: string;
  locationId: string;
  startTime: string;     
  endTime: string;        
  appointmentStatus: "pending" | "confirmed" | "cancelled";
  ghlContactId?: string;
  ghlAppointmentId?: string;
}



const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("Cannot find API URL");

const BASE_URL = `${API_URL}/bookings`;

function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not logged in");
  return token;
}

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function fetchMyBookings(): Promise<Booking[]> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/my`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}

export async function createBooking(data: Omit<Booking, "id">): Promise<Booking> {
  const token = getToken();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function updateBooking(
  id: string,
  data: Partial<Omit<Booking, "id">>
): Promise<Booking> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function getBookingById(id: string): Promise<Booking> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}


export async function deleteBooking(id: string): Promise<void> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  await handleResponse(res);
}
