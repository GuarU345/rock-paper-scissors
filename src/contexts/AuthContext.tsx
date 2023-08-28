import { create } from "zustand";
import { toast } from "sonner";
import { signin } from "../services/auth";
import { socket } from "../socket/socket";
import { Room, SigninBody, UserId } from "../types";
import { getDisponibleRooms } from "../services/game";

interface AuthStore {
  token: string | null;
  userInfo: UserId | null;
  login: (data: SigninBody, reset: () => void) => Promise<void>;
  getToken: () => string | null;
  getUserInfo: () => UserId | null;
  getRooms: () => Room[];
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  userInfo: JSON.parse(localStorage.getItem("pocketbase_auth")) || null,

  login: async (data: SigninBody, reset: () => void) => {
    try {
      const response = await signin(data);
      localStorage.setItem("token", response);
      set({ token: response });
      socket.connect();
      toast.success("Login Successfully");
      reset();
    } catch (error) {
      toast.error(`${error}`);
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pocketbase_auth");
  },

  getToken: () => {
    return localStorage.getItem("token") || null;
  },

  getUserInfo: () => {
    return JSON.parse(localStorage.getItem("pocketbase_auth")) || null;
  },

  getRooms: async () => {
    await getDisponibleRooms();
  },
}));

export default useAuthStore;
