"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        email,
        password,
    }),
    });

    const data = await response.json();

    if (!response.ok) {
    setError(data.error || "Login failed");
    return;
    }

    window.location.href = "/admin/projects";
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-2">
          Admin Login
        </h1>

        <p className="text-gray-400 mb-8">
          Sign in to manage your portfolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full border border-white/10 rounded-md px-4 py-3 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              className="w-full border border-white/10 rounded-md px-4 py-3 bg-transparent"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full border border-white/20 rounded-md py-3 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}