import { create } from "zustand";
import { toast } from "sonner";
import { signin } from "../services/auth";
import { socket } from "../socket/socket";
import { type SigninBody } from "../types";

interface AuthStore {
  token: string | null;
  userId: string | null;
  setToken: (newToken: string | null) => void;
  setUserId: (newUserId: string | null) => void;
  login: (data: SigninBody, reset: () => void) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (newToken) => set({ token: newToken }),
  setUserId: (newUserId) => set({ userId: newUserId }),
  userId: localStorage.getItem("userId") || null,

  login: async (data: SigninBody, reset: () => void) => {
    try {
      const response = await signin(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.record.id);
      set({ token: response.token });
      set({ userId: response.record.id });
      socket.connect();
      toast.success("Login Successfully");
      reset();
    } catch (error) {
      toast.error(`${error}`);
    }
  },
}));

export default useAuthStore;
