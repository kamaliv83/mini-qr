import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "secret"
);

export async function POST(req: NextRequest) {
  try {
    const { adminId, password } = await req.json();

    if (
      adminId !== "admin" ||
      password !== "admin123"
    ) {
      return NextResponse.json(
        {
          error: "Invalid Admin ID or Password",
        },
        {
          status: 401,
        }
      );
    }

    const token = await new SignJWT({
      role: "ADMIN",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setSubject("admin")
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Login Successful",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Login Failed",
      },
      {
        status: 400,
      }
    );
  }
}