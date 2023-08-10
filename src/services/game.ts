import axios from "axios";
import { Room, Response } from "../types";

const createRoom = async (body: string) => {
  const { data } = await axios.post<Room>(
    "http://127.0.0.1:8090/api/collections/rooms/records",
    {
      name: body,
    }
  );
  return data;
};

const getDisponibleRooms = async () => {
  const { data } = await axios.get<Response<Room>>(
    "http://127.0.0.1:8090/api/collections/rooms/records"
  );
  return data.items.filter((r) => r.playing === false);
};

export { createRoom, getDisponibleRooms };
