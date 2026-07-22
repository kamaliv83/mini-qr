"use client";

import { useState } from "react";
import QRCodeCard from "./QRCodeCard";

type SessionResult = {
  session: {
    id: string;
    title: string;
    host: string;
    joinToken: string;
  };
  joinUrl: string;
  qrDataUrl: string;
};

export default function CreateSessionForm() {
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [result, setResult] = useState<SessionResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        host,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setResult(data);

    setTitle("");
    setHost("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Host Name"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Create Session
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      {result && (
        <QRCodeCard
          title={result.session.title}
          host={result.session.host}
          joinUrl={result.joinUrl}
          qrDataUrl={result.qrDataUrl}
        />
      )}
    </>
  );
}