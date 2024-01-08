import { io } from "socket.io-client";

const URL = "http://192.168.1.37:4000";

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});
