import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomState {
  Id: string | null;
  Name: string | null;
  setRoom: (name: string) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      Id: null,
      Name: null,

      setRoom: (name) => set({ Name: name }),
      clearRoom: () => set({ Id: null, Name: null }),
    }),
    {
      name: "room-storage", // key in localStorage
    }
  )
);
