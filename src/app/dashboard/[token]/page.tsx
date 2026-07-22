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

type DashboardData = {
  title: string;
  host: string;
  joinToken: string;
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
  const [error, setError] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function loadDashboard() {
      try {
        const { token } = await params;

        const res = await fetch(`/api/dashboard/${token}`);
        const result = await res.json();

        if (!res.ok) {
          setError(result.error);
          return;
        }

        setData(result);
      } catch {
        setError("Failed to load dashboard.");
      }
    }

    loadDashboard();

    interval = setInterval(loadDashboard, 5000);

    return () => clearInterval(interval);
  }, [params]);

  if (error) {
    return (
      <main className="mx-auto mt-10 max-w-4xl p-6">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto mt-10 max-w-4xl p-6">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  const joinUrl = `${window.location.origin}/join/${data.joinToken}`;

  return (
    <main className="mx-auto mt-10 max-w-4xl space-y-6 p-6">
      <DashboardHeader
        title={data.title}
        host={data.host}
        joinUrl={joinUrl}
      />

      <StatsCard
        total={data.attendees.length}
      />

      <AttendeeTable
        attendees={data.attendees}
      />
    </main>
  );
}