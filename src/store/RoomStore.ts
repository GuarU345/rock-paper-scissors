import { create } from "zustand";
import { type Room } from "../types";
import { getDisponibleRooms } from "../services/game";

interface State {
  rooms: Room[];
  roomId: string | null;
  getRooms: () => Promise<void>;
}

export const useRoomStore = create<State>((set) => ({
  rooms: [],
  roomId: null,
  setRoomId: (state: string) => set({ roomId: state }),
  getRooms: async () => {
    const rooms = await getDisponibleRooms();
    set({ rooms });
  },
}));
