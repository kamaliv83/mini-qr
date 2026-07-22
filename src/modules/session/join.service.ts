import { db } from "@/lib/db";

export async function joinSession(token: string, name: string) {
  const attendeeName = name.trim();

  if (!attendeeName) {
    throw new Error("Name is required.");
  }

  const session = await db.session.findUnique({
    where: {
      joinToken: token,
    },
  });

  if (!session) {
    throw new Error("Session not found.");
  }

  const existingAttendee = await db.attendee.findFirst({
    where: {
      sessionId: session.id,
      name: attendeeName,
    },
  });

  if (existingAttendee) {
    throw new Error("This name has already joined this session.");
  }

  const attendee = await db.attendee.create({
    data: {
      name: attendeeName,
      sessionId: session.id,
    },
  });

  return {
    session,
    attendee,
  };
}