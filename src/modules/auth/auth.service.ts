import { db } from "@/lib/db";

const OTP = "123456";

const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "admin123";

export async function requestOtp(
  mobile: string
) {
  await db.user.upsert({
    where: {
      mobile,
    },
    update: {},
    create: {
      mobile,
      role: "USER",
    },
  });

  return {
    message: "OTP Sent",
  };
}

export async function verifyOtp(
  mobile: string,
  otp: string
) {
  if (otp !== OTP) {
    throw new Error("Invalid OTP");
  }

  const user = await db.user.findUnique({
    where: {
      mobile,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function verifyAdmin(
  adminId: string,
  password: string
) {
  if (
    adminId !== ADMIN_ID ||
    password !== ADMIN_PASSWORD
  ) {
    throw new Error(
      "Invalid Admin Credentials"
    );
  }

  return {
    id: "admin",
    role: "ADMIN",
    name: "Administrator",
  };
}