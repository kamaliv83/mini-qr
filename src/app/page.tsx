import CreateSessionForm from "@/components/session/CreateSessionForm";

export default function Home() {
  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">
        QR Attendance System
      </h1>

      <CreateSessionForm />
    </main>
  );
}