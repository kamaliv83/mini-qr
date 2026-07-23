"use client";

import { useEffect, useState } from "react";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const res = await fetch("/api/auth/me");

      if (res.ok) {
        window.location.href = "/";
      }
    }

    checkLogin();
  }, []);

  async function sendOtp() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setStep(2);
    } catch {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Login
      </h1>

      {step === 1 ? (
        <>
          <input
            className="w-full border rounded p-2"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white rounded p-2"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            className="w-full border rounded p-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verify}
            disabled={loading}
            className="w-full mt-4 bg-green-600 text-white rounded p-2"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-center">
          {error}
        </p>
      )}

    </main>
  );
}