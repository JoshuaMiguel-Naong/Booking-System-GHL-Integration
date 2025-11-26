"use client";

import React from "react";
import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
  supportEmail?: string;
};

export default function Unauthorized({
  title = "401 — Unauthorized",
  message = "You don't have permission to access this page.",
  supportEmail,
}: Props) {
  return (
    <main
      aria-labelledby="unauth-title"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-6 py-12 text-gray-200"
    >
      <div className="max-w-3xl w-full bg-gray-800/80 backdrop-blur-md shadow-xl border border-gray-700 rounded-2xl p-8 sm:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Icon */}
          <div className="flex-shrink-0 w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2v2M4.9 4.9l1.4 1.4M20 12h2M2 12h2M19.1 19.1l-1.4-1.4M12 20v2M7.05 19.95l1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9 12h6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 id="unauth-title" className="text-2xl sm:text-3xl font-semibold text-white">
              {title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
              {message}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-600 text-sm font-medium text-gray-200 hover:bg-gray-700 transition"
              >
                Go back
              </button>

              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-600 text-sm font-medium text-gray-200 hover:bg-gray-700 transition"
              >
                Return home
              </Link>
            </div>

            {supportEmail && (
              <p className="mt-4 text-xs text-gray-400">
                Need help? Email{" "}
                <a href={`mailto:${supportEmail}`} className="text-indigo-400 underline">
                  {supportEmail}
                </a>
                .
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
