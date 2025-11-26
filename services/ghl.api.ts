const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/ghl";


export async function fetchGhlContacts() {
  const res = await fetch(`${BASE_URL}/contacts`);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json(); 
}


export async function getGhlContact(id: string) {
  const res = await fetch(`${BASE_URL}/contact/${id}`);
  if (!res.ok) throw new Error("Contact not found");
  return res.json(); 
}

export async function createGhlContact(contact: any) {
  const res = await fetch(`${BASE_URL}/contact/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (!res.ok) throw new Error("Failed to save contact");
  return res.json(); 
}


export async function updateAppointment(
  ghlAppointmentId: string,
  data: { title: string; startTime: string; endTime: string; notes?: string }
) {
  const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY;

  const res = await fetch(
    `${BASE_URL}/calendars/events/appointments/${ghlAppointmentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to update HighLevel appointment: ${res.statusText}`);
  }

  return await res.json();
}


export async function updateGhlAppointment(
  ghlAppointmentId: string,
  data: { title: string; startTime: string; endTime: string; notes?: string }
) {
  if (!ghlAppointmentId) {
    throw new Error("GHL Appointment ID is required");
  }

  const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_GHL_BASE_URL; 

  const res = await fetch(
    `${BASE_URL}/calendars/events/appointments/${ghlAppointmentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update HighLevel appointment: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function deleteGhlAppointment(ghlAppointmentId: string) {
  if (!ghlAppointmentId) throw new Error("GHL Appointment ID is required");

  const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_GHL_BASE_URL;

  const res = await fetch(`${BASE_URL}/calendars/events/${ghlAppointmentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete HighLevel appointment: ${res.status} ${text}`);
  }

  return res.json();
}


