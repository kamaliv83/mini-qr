import { randomBytes } from "crypto";

export function generateJoinToken(): string {
  return randomBytes(6).toString("hex");
}