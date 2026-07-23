"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import AttendeeTable from "@/components/dashboard/AttendeeTable";

type Attendee = {
  id: string;
  name: string;
  joinedAt: string;
};

type Feedback = {
  id: string;
  rating: number;
  feedback: string;
};

type DashboardData = {
  title: string;
  host: string;
  joinToken: string;
  joinUrl: string;
  qrDataUrl: string;
  attendees: Attendee[];
};

interface DashboardPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function DashboardPage({
  params,
}: DashboardPageProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function loadDashboard() {
      try {
        const { token } = await params;

        const dashboardRes = await fetch(`/api/dashboard/${token}`);
        const dashboardData = await dashboardRes.json();

        if (!dashboardRes.ok) {
          setError(dashboardData.error);
          return;
        }

        setData(dashboardData);

        const feedbackRes = await fetch(
          `/api/dashboard/feedback/${token}`
        );

        if (feedbackRes.ok) {
          const feedbackData = await feedbackRes.json();
          setFeedbacks(feedbackData);
        }
      } catch {
        setError("Failed to load dashboard.");
      }
    }

    loadDashboard();

    interval = setInterval(loadDashboard, 3000);

    return () => clearInterval(interval);
  }, [params]);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  async function copyUrl() {
    if (!data) return;

    const joinUrl = `${window.location.origin}/join/${data.joinToken}`;

    await navigator.clipboard.writeText(joinUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-6 mt-10">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="max-w-6xl mx-auto p-6 mt-10">
        <p>Loading Dashboard...</p>
      </main>
    );
  }

  const joinUrl = `${window.location.origin}/join/${data.joinToken}`;

  const totalFeedback = feedbacks.length;

  const averageRating =
    totalFeedback === 0
      ? "-"
      : (
          feedbacks.reduce((sum, item) => sum + item.rating, 0) /
          totalFeedback
        ).toFixed(1);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500">
            Live Session Monitoring
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <DashboardHeader
        title={data.title}
        host={data.host}
        joinUrl={joinUrl}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatsCard total={data.attendees.length} />

        <div className="border rounded-lg p-5 shadow">
          <h3 className="font-semibold mb-2">
            Session Status
          </h3>

          <p className="text-green-600 font-bold">
            🟢 Running
          </p>
        </div>

        <div className="border rounded-lg p-5 shadow">
          <h3 className="font-semibold mb-2">
            Session Token
          </h3>

          <p className="font-mono">
            {data.joinToken}
          </p>
        </div>

      </div>
      <div className="border rounded-lg p-5 shadow space-y-4">
        <h2 className="text-xl font-semibold">
          Join URL
          </h2>
          <div className="bg-gray-100 rounded p-3 break-all">
            {data.joinUrl}
            </div>
            <button
            onClick={copyUrl}
            className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    {copied ? "Copied ✅" : "Copy URL"}
    </button>
    <div className="flex justify-center pt-2">
      <img
      src={data.qrDataUrl}
      alt="Session QR Code"
      className="w-56 border rounded-lg"
    />
  </div>

</div>

      <div className="border rounded-lg p-5 shadow">

        <h2 className="text-xl font-semibold mb-4">
          Live Participants
        </h2>

        <AttendeeTable attendees={data.attendees} />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="border rounded-lg p-5 shadow">

          <h2 className="text-lg font-semibold mb-4">
            Feedback Summary
          </h2>

          <p>Total Feedback : {totalFeedback}</p>

          <p>Average Rating : {averageRating}</p>

        </div>

        <div className="border rounded-lg p-5 shadow">

          <h2 className="text-lg font-semibold mb-4">
            Session Analytics
          </h2>

          <p>Joined Users : {data.attendees.length}</p>

          <p>Feedback Received : {totalFeedback}</p>

          <p>Session Status : Running</p>

        </div>

      </div>

    </main>
  );
}