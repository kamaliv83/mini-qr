"use client";

import { useState } from "react";

interface JoinPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function JoinPage({ params }: JoinPageProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const { token } = await params;

    const res = await fetch(`/api/join/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setMessage("Successfully joined the session!");
    setName("");
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Join Session
      </h1>

      <form onSubmit={handleJoin} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Join Session
        </button>
      </form>

      {message && (
        <p className="text-green-600 mt-4">{message}</p>
      )}

      {error && (
        <p className="text-red-600 mt-4">{error}</p>
      )}
    </main>
  );
}