"use client";

import { useState } from "react";
import GhlContactForm from "@/components/ghl/ghl-contact-form";
import MainLayout from "@/components/layout/main-layout";


export default function GhlContactPage() {
  const [loadedContact, setLoadedContact] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 p-6">
     <MainLayout>
      <GhlContactForm on_saved={setLoadedContact} />
     </MainLayout>


    </div>
  );
}
