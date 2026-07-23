"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="max-w-md mx-auto mt-20 border rounded-lg p-6 shadow">

      <h1 className="text-3xl font-bold mb-6">
        Admin Login
      </h1>

      <form onSubmit={login} className="space-y-4">

        <input
          className="border rounded p-2 w-full"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="password"
          className="border rounded p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </form>

      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}

    </main>
  );
}