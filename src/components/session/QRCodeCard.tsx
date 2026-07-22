"use client";

type Props = {
  qrDataUrl: string;
};

export default function QRCodeCard({
  qrDataUrl,
}: Props) {
  function downloadQRCode() {
    const link = document.createElement("a");

    link.href = qrDataUrl;
    link.download = "session-qr.png";

    link.click();
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Session QR Code
      </h2>

      <img
        src={qrDataUrl}
        alt="Session QR Code"
        className="mx-auto w-64 border"
      />

      <div className="mt-5 text-center">
        <button
          onClick={downloadQRCode}
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          ⬇ Download QR Code
        </button>
      </div>
    </div>
  );
}