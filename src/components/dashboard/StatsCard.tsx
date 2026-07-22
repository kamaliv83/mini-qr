type Props = {
  total: number;
};

export default function StatsCard({ total }: Props) {
  return (
    <div className="mb-6 rounded-xl bg-green-600 p-6 text-white shadow">
      <h2 className="text-lg font-semibold">
        Total Attendees
      </h2>

      <p className="mt-2 text-4xl font-bold">
        {total}
      </p>
    </div>
  );
}
