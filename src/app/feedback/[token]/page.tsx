"use client";

import { useState } from "react";

interface FeedbackPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function FeedbackPage({
  params,
}: FeedbackPageProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitFeedback(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { token } = await params;

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        rating,
        feedback,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to submit feedback");
      return;
    }

    alert("Feedback submitted successfully");

    window.location.href = "/thank-you";
  }

  return (
    <main className="max-w-lg mx-auto mt-16 p-6 border rounded-lg shadow">

      <h1 className="text-3xl font-bold mb-6">
        Session Feedback
      </h1>

      <form
        onSubmit={submitFeedback}
        className="space-y-5"
      >

        <div>

          <label className="font-semibold">
            Rating
          </label>

          <select
            className="border rounded w-full p-2 mt-2"
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Good</option>
            <option value={3}>⭐⭐⭐ Average</option>
            <option value={2}>⭐⭐ Poor</option>
            <option value={1}>⭐ Very Poor</option>
          </select>

        </div>

        <div>

          <label className="font-semibold">
            Feedback
          </label>

          <textarea
            className="border rounded w-full p-2 mt-2"
            rows={5}
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) =>
              setFeedback(e.target.value)
            }
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-3"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </form>

    </main>
  );
}