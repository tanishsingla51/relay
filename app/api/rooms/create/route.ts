import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/lib/db/client";

// ✅ Create a new room
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user id from the email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Room name is required" }, { status: 400 });
    }

    // Create room
    const room = await prisma.room.create({
      data: {
        name,
        createrId: user.id,
      },
    });

    return NextResponse.json({
      id: room.id,
      name: room.name,
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
