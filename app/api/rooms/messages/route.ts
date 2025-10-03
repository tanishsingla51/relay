import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) return NextResponse.json([], { status: 400 });

  const messages = await prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      authorId: true,
      authorName: true,   // ✅ include this
      content: true,
      createdAt: true,
    },
  });

  return NextResponse.json(messages);
}
