import { create } from "zustand";
import { toast } from "sonner";
import { signin } from "../services/auth";
import { socket } from "../socket/socket";
import { SigninBody, UserId } from "../types";

interface AuthStore {
  token: string | null;
  userInfo: UserId | null;
  login: (data: SigninBody, reset: () => void) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (newToken: string | null) => set({ token: newToken }),
  userInfo:
    JSON.parse(localStorage.getItem("pocketbase_auth") as string) || null,

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
}));

export default useAuthStore;
