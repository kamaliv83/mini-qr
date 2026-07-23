import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

import { createSession } from "@/modules/session/session.service";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Please login first",
        },
        {
          status: 401,
        }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Only Admin can create sessions",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const session = await createSession(body);

    const joinUrl =
      `${req.nextUrl.origin}/join/${session.joinToken}`;

    const qrDataUrl =
      await QRCode.toDataURL(joinUrl);

    return NextResponse.json(
      {
        session,
        joinUrl,
        qrDataUrl,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 400,
      }
    );

  }
}