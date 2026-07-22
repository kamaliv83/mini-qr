import { db } from "@/lib/db";
import { generateJoinToken } from "@/lib/token";

export async function createSession(input: {
  title: string;
  host: string;
}) {
  const title = input.title?.trim();
  const host = input.host?.trim();

  if (!title || !host) {
    throw new Error("Title and Host are required.");
  }

  return db.session.create({
    data: {
      title,
      host,
      joinToken: generateJoinToken(),
    },
  });
}