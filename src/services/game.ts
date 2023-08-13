import axios from "axios";
import { Room, Response, Game, GameBody } from "../types";

const API_URL = "http://127.0.0.1:8090/api/collections";

const createRoom = async (body: string) => {
  const { data } = await axios.post<Room>(`${API_URL}/rooms/records`, {
    name: body,
  });
  return data;
};

const newGame = async (body: GameBody) => {
  const { data } = await axios.post<Game>(`${API_URL}/games/records`, body);
  return data;
};

const getDisponibleRooms = async () => {
  const { data } = await axios.get<Response<Room>>(`${API_URL}/rooms/records`);
  return data.items.filter((r) => r.playing === false);
};

const getOptions = async () => {
  const { data } = await axios.get(`${API_URL}/options/records`);
  return data.items;
};

export { createRoom, getDisponibleRooms, newGame, getOptions };
