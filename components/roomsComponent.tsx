"use client";

import { motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRoomStore } from "@/store/useRoomStore";

interface Room {
  id: string;
  name: string;
}

export default function RoomsComponent() {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [createdRooms, setCreatedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const { setRoom } = useRoomStore();

  const router = useRouter();

  // Toast helper
  const showToast = (message: string, type: "error" | "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Create room
  const handleCreateRoom = async () => {
    if (roomName.trim() === "") {
      showToast("Please enter a room name", "error");
      return;
    }

    try {
      setLoading(true);
      setRoom(roomName);
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed to create room", "error");
        return;
      }

      setCreatedRooms((prev) => [{ id: data.id, name: data.name }, ...prev]);
      setRoomName("");
      showToast("Room created successfully!", "success");

      router.push(`/chatRoom/${data.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search room
  const handleSearchRoom = async () => {
    if (roomId.trim() === "") {
      showToast("Please enter a room ID to search", "error");
      return;
    }

    try {
      const res = await fetch("/api/rooms/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: roomId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Room not found", "error");
        return;
      }

      setRoom(data.name);
      setRoomId("");
      showToast("Joining room...", "success");
      router.push(`/chatRoom/${data.id}`);
    } catch (error) {
      console.error("Error searching room:", error);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="hover:bg-white/20 rounded-full p-1 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      <motion.div
        className="max-w-7xl mx-auto p-8 grid md:grid-cols-2 gap-12 min-h-[80vh] items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Create Room */}
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 flex flex-col gap-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Create a Chat Room
          </h2>
          <p className="text-gray-600">
            Start a new conversation with your friends or team. Give your room a name!
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <button
              onClick={handleCreateRoom}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

          {/* Show created rooms */}
          {createdRooms.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Your Created Rooms
              </h3>
              {createdRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-xl"
                >
                  <span className="font-medium text-gray-900">{room.name}</span>
                  <span className="text-sm text-gray-500">{room.id}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Search Room */}
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 flex flex-col gap-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Search a Chat Room
          </h2>
          <p className="text-gray-600">
            Enter the room ID to join an existing chat room.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchRoom()}
              placeholder="Enter room ID"
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <button
              onClick={handleSearchRoom}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
