import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

import { getSessionDashboard } from "@/modules/session/dashboard.service";

interface RouteContext {
  params: Promise<{
    token: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { token } = await params;

    const session = await getSessionDashboard(token);

    const joinUrl =
      `${req.nextUrl.origin}/join/${session.joinToken}`;

    const qrDataUrl =
      await QRCode.toDataURL(joinUrl);

    return NextResponse.json({
      ...session,
      joinUrl,
      qrDataUrl,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 404,
      }
    );

  }
}