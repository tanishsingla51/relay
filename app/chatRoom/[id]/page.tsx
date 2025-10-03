"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { Send, Users, Circle, Check, Copy } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";

let socket: Socket;

export default function ChatRoom() {
  const { id: roomId } = useParams<{ id: string }>(); 
  const { data: session } = useSession();             
  const { Name } = useRoomStore();
  const [userCount, setUserCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roomId || !session?.user?.id) return;
  
    socket = io("http://localhost:4000");
  
    socket.on("roomUsers", ({ count }) => {
      console.log("Room users count:", count);
      setUserCount(count);
    });
  
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // ✅ Pass userId when joining
      socket.emit("joinRoom", { 
        roomId, 
        userId: session.user.id 
      });
    });
  
    fetch(`/api/rooms/messages?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  
    return () => {
      socket.disconnect();
    };
  }, [roomId, session?.user?.id]);
  

  const sendMessage = () => {
    if (!newMessage.trim() || !session?.user) return;

    socket.emit("message", {
      roomId,
      authorId: session.user.id,
      authorName: session.user.name,   // ✅ make sure backend saves this too
      content: newMessage,
    });

    setNewMessage("");
  };

  const copyRoomId = async () => {
    if (!roomId) return;
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy roomId:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 font-semibold text-lg">{Name}</h1>
              <div className="flex items-center space-x-2 mt-0.5">
                <Circle className="w-2 h-2 text-green-500 fill-green-500" />
                <p className="text-gray-500 text-sm">{userCount} online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
          <button
              onClick={copyRoomId}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 text-sm font-medium">Copy Room ID</span>
                </>
              )}
            </button>
            <div className="px-3 py-1.5 bg-green-50 rounded-full">
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {messages.map((msg, idx) => {
            const isOwnMessage = msg.authorId === session?.user?.id;

            return (
              <div
                key={idx}
                className={`flex items-end space-x-3 ${
                  isOwnMessage ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Bubble */}
                <div
                  className={`flex flex-col ${
                    isOwnMessage ? "items-end" : "items-start"
                  } max-w-[65%]`}
                >
                  {/* ✅ Username ALWAYS above bubble */}
                  <span className="text-xs font-medium text-gray-600 mb-1 px-1">
                    {msg.authorName}
                  </span>

                  <div
                    className={`rounded-3xl px-5 py-3 shadow-sm ${
                      isOwnMessage
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-lg"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-lg"
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed break-words">
                      {msg.content}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400 mt-1.5 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 border border-gray-200"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full p-3.5 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
