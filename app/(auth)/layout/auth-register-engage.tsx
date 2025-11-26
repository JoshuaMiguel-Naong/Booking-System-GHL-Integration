"use client";

import { useRouter } from "next/navigation";

interface AuthEngageProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export default function AuthEngage({ title, description, buttonText, onClick }: AuthEngageProps) {
  return (
    <div className="text-center md:text-left max-w-md text-gray-100">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-300 mb-6">{description}</p>
      <button
        onClick={onClick}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
