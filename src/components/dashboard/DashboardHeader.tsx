"use client";

type Props = {
  title: string;
  host: string;
  joinUrl: string;
};

export default function DashboardHeader({
  title,
  host,
  joinUrl,
}: Props) {
  async function copyJoinUrl() {
    try {
      await navigator.clipboard.writeText(joinUrl);
      alert("Join URL copied successfully!");
    } catch {
      alert("Failed to copy Join URL.");
    }
  }

  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow">
      <h1 className="text-3xl font-bold text-blue-700">
        Host Dashboard
      </h1>

      <div className="mt-4 space-y-3">
        <p>
          <strong>Session:</strong> {title}
        </p>

        <p>
          <strong>Host:</strong> {host}
        </p>

        <div>
          <strong>Join URL</strong>

          <p className="mt-1 break-all text-blue-600">
            {joinUrl}
          </p>

          <button
            onClick={copyJoinUrl}
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            📋 Copy Join URL
          </button>
        </div>
      </div>
    </div>
  );
}