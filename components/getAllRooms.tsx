"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hash, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRoomStore } from "@/store/useRoomStore";

interface Room {
  id: string;
  name: string;
  createdAt: string;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setRoom } = useRoomStore();

  // Fetch rooms when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchRooms();
    }
  }, [isOpen]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/rooms/getAll");
      const data = await res.json();

      if (res.ok) {
        setRooms(data.rooms[0]?.rooms || []);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomClick = (room: Room) => {
    setRoom(room.name);
    router.push(`/chatRoom/${room.id}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button - Minimal design */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-50 bg-white text-gray-700 p-2.5 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Clean minimal design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-40 flex flex-col"
          >
            {/* Header - Minimal */}
            <div className="px-5 pt-6 pb-4 border-b border-gray-100 pl-20">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                Rooms
              </h2>
              <p className="text-xs text-gray-500">
                {rooms.length} available
              </p>
            </div>

            {/* Rooms List - Clean spacing */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
                </div>
              ) : rooms.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <Hash className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">No rooms yet</p>
                  <p className="text-xs text-gray-500">Create or join a room to start</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {rooms.map((room) => (
                    <motion.button
                      key={room.id}
                      onClick={() => handleRoomClick(room)}
                      className="w-full hover:bg-gray-50 rounded-lg px-3 py-2.5 transition-colors duration-150 group text-left"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Hash className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate">
                            {room.name}
                          </h3>
                        </div>
                        <Circle className="w-1.5 h-1.5 text-gray-300 fill-gray-300 flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Minimal */}
            <div className="px-3 py-3 border-t border-gray-100">
              <button
                onClick={fetchRooms}
                disabled={loading}
                className="w-full text-xs font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}