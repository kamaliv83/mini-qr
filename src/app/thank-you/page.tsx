export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">

        <h1 className="text-5xl font-bold text-green-600">
          Thank You 🎉
        </h1>

        <p className="text-xl">
          Your feedback has been submitted successfully.
        </p>

        <a
          href="/"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Go Home
        </a>

      </div>
    </main>
  );
}