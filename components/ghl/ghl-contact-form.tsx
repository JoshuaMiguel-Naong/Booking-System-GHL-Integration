"use client";

import { useState } from "react";
import {createGhlContact, getGhlContact } from "@/services/ghl.api";

interface Props {
  on_saved?: (contact: any) => void;
}

export default function GhlContactForm({ on_saved }: Props) {
  const [form, setForm] = useState({
    ghl_contact_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [loadedContact, setLoadedContact] = useState<any | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const result = await createGhlContact(form);
      const contact = result.contact; 
      setLoadedContact(contact);
      on_saved?.(result);
      alert("Contact saved!");
    } catch (err) {
      alert("Error saving contact");
    }
  };

  const loadContact = async () => {
    try {
      const result = await getGhlContact(form.ghl_contact_id);
      const contact = result.contact; // extract contact
      setLoadedContact(contact);
      on_saved?.(result);
      alert("Contact loaded!");
    } catch (err) {
      alert("Contact not found");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md text-gray-100 max-w-3xl mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          name="ghl_contact_id"
          placeholder="GHL Contact ID"
          value={form.ghl_contact_id}
          onChange={handleChange}
          className="flex-1 p-2 rounded bg-gray-800 text-gray-100"
        />
        <button
          onClick={loadContact}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Load
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-gray-100"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-gray-100"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-gray-100 col-span-2"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-gray-100 col-span-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Save Contact
      </button>

      {loadedContact && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <table className="w-full text-left border border-gray-700">
            <tbody>
              <tr>
                <th className="p-2 border-b border-gray-700">ID</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.id}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Name</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.contactName}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Email</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.email}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Phone</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.phone}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Location ID</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.locationId}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Type</th>
                <td className="p-2 border-b border-gray-700">{loadedContact.type}</td>
              </tr>
              <tr>
                <th className="p-2 border-b border-gray-700">Date Added</th>
                <td className="p-2 border-b border-gray-700">
                  {new Date(loadedContact.dateAdded).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
