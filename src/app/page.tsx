"use client";

import { useState } from "react";

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

export default function Home() {
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [result, setResult] = useState<SessionResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
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
  }

  async function copyJoinUrl() {
    if (!result) return;

    await navigator.clipboard.writeText(result.joinUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function downloadQR() {
    if (!result) return;

    const link = document.createElement("a");

    link.href = result.qrDataUrl;
    link.download = `${result.session.title}-qr.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Session
      </h1>

      <form 
        onSubmit={handleCreate}
        className="space-y-4"
      >

        <input
          className="w-full border rounded p-2"
          placeholder="Session Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded p-2"
          placeholder="Host Name"
          value={host}
          onChange={(e)=>setHost(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Create Session
        </button>

      </form>


      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}



      {result && (

        <div className="mt-8 border rounded p-5 space-y-4">

          <h2 className="text-xl font-semibold">
            Session Created ✅
          </h2>


          <p>
            <b>Title:</b> {result.session.title}
          </p>


          <p>
            <b>Host:</b> {result.session.host}
          </p>


          <div>

            <p className="font-semibold">
              Join URL:
            </p>

            <div className="break-all border p-2 rounded bg-gray-100">
              {result.joinUrl}
            </div>

          </div>



          <button
            onClick={copyJoinUrl}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {copied ? "Copied ✅" : "Copy URL"}
          </button>



          <div>

            <p className="font-semibold mb-2">
              QR Code:
            </p>


            <img
              src={result.qrDataUrl}
              alt="Session QR Code"
              className="border w-52"
            />

          </div>



          <button
            onClick={downloadQR}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Download QR
          </button>


        </div>

      )}

    </main>
  );
}