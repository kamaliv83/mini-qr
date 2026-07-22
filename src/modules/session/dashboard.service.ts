import { db } from "@/lib/db";

export async function getSessionDashboard(token: string) {
  const session = await db.session.findUnique({
    where: {
      joinToken: token,
    },
    include: {
      attendees: {
        orderBy: {
          joinedAt: "asc",
        },
      },
    },
  });

  if (!session) {
    throw new Error("Session not found.");
  }

  return session;
}