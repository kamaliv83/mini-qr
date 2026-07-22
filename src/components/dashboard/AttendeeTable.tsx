type Attendee = {
  id: string;
  name: string;
  joinedAt: string;
};

type Props = {
  attendees: Attendee[];
};

export default function AttendeeTable({
  attendees,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Attendees
      </h2>

      {attendees.length === 0 ? (
        <p>No attendees joined yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Joined Time</th>
            </tr>
          </thead>

          <tbody>
            {attendees.map((attendee, index) => (
              <tr
                key={attendee.id}
                className="border-b"
              >
                <td className="p-2">{index + 1}</td>

                <td className="p-2">
                  {attendee.name}
                </td>

                <td className="p-2">
                  {new Date(
                    attendee.joinedAt
                  ).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}