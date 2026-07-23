"use client";

import { useState } from "react";

interface JoinPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function JoinPage({ params }: JoinPageProps) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function sendOtp() {
    setError("");

    const res = await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    });

    if (!res.ok) {
      setError("Failed to send OTP");
      return;
    }

    setStep(2);
  }

  async function verifyAndJoin() {
    setError("");

    const verify = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        otp,
      }),
    });

    const verifyData = await verify.json();

    if (!verify.ok) {
      setError(verifyData.error);
      return;
    }

    const { token } = await params;

    const join = await fetch(`/api/join/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const joinData = await join.json();

    if (!join.ok) {
      setError(joinData.error);
      return;
    }

    setMessage("Successfully Joined Session ✅");

    setTimeout(() => {
      window.location.href = "/feedback";
    }, 1000);
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 space-y-4">
      <h1 className="text-3xl font-bold">
        Join Session
      </h1>

      {step === 1 && (
        <>
          <input
            className="border p-2 w-full"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="border p-2 w-full"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={verifyAndJoin}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify & Join
          </button>
        </>
      )}

      {message && (
        <p className="text-green-600">{message}</p>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}
    </main>
  );
}