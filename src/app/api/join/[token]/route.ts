import { NextRequest, NextResponse } from "next/server";
import { joinSession } from "@/modules/session/join.service";

interface RouteContext {
  params: Promise<{
    token: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { token } = await params;
    const { name } = await req.json();

    const result = await joinSession(token, name);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 400 }
    );
  }
}