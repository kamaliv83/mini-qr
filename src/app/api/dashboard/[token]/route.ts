import { NextRequest, NextResponse } from "next/server";
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

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 404 }
    );
  }
}