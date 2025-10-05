import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "@/lib/db/client";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Track unique users per room: roomId -> Set<userId>
const roomUsers = new Map<string, Set<string>>();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a room
  socket.on("joinRoom", ({ roomId, userId }: { roomId: string; userId: string }) => {
    socket.join(roomId);

    // Store userId on socket for later reference
    socket.data.userId = userId;
    socket.data.roomId = roomId;

    // Add user to the room's unique user set
    if (!roomUsers.has(roomId)) {
      roomUsers.set(roomId, new Set());
    }
    roomUsers.get(roomId)!.add(userId);

    const uniqueUserCount = roomUsers.get(roomId)!.size;
    console.log(`User ${userId} joined room ${roomId}. Unique users: ${uniqueUserCount}`);

    // Broadcast updated unique user count
    io.to(roomId).emit("roomUsers", { count: uniqueUserCount });
  });

  // Message event
  socket.on("message", async ({ roomId, authorId, authorName, content }) => {
    if (!roomId || !authorId) return;

    try {
      const message = await prisma.message.create({
        data: { 
          content, 
          roomId, 
          authorId,
          authorName, // Save authorName for display
        },
      });

      io.to(roomId).emit("message", message);
    } catch (err) {
      console.error("Error creating message:", err);
    }
  });

  // Handle leaving room
  socket.on("disconnecting", () => {
    const userId = socket.data.userId;
    const roomId = socket.data.roomId;

    if (!userId || !roomId) return;

    // Check if user has other active connections in this room
    const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
    let userStillInRoom = false;

    if (socketsInRoom) {
      for (const socketId of socketsInRoom) {
        const otherSocket = io.sockets.sockets.get(socketId);
        if (otherSocket && otherSocket.id !== socket.id && otherSocket.data.userId === userId) {
          userStillInRoom = true;
          break;
        }
      }
    }

    // Only remove user if they have no other active connections
    if (!userStillInRoom && roomUsers.has(roomId)) {
      roomUsers.get(roomId)!.delete(userId);
      
      const uniqueUserCount = roomUsers.get(roomId)!.size;
      console.log(`User ${userId} left room ${roomId}. Unique users: ${uniqueUserCount}`);

      // Clean up empty room
      if (uniqueUserCount === 0) {
        roomUsers.delete(roomId);
      }

      io.to(roomId).emit("roomUsers", { count: uniqueUserCount });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log("WebSocket server running on http://localhost:4000");
});

