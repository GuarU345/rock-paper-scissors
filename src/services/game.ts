/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Room, Response, Game, GameBody } from "../types";

const API_URL = "https://rps-db.pockethost.io/api/collections";

const createRoom = async (body: string) => {
  const { data } = await axios.post<Room>(`${API_URL}/rooms/records`, {
    name: body,
  });
  return data;
};

const updateRoom = async (id: string, room: any) => {
  const { data } = await axios.patch(`${API_URL}/rooms/records/${id}`, room);
  return data;
};

const newGame = async (body: GameBody) => {
  const { data } = await axios.post<Game>(`${API_URL}/games/records`, body);
  return data;
};

const updateGame = async (id: string, body: GameBody) => {
  const { data } = await axios.patch(`${API_URL}/games/records/${id}`, body);
  return data;
};

const getDisponibleRooms = async () => {
  const { data } = await axios.get<Response<Room>>(
    `${API_URL}/rooms/records?sort=-created`
  );
  return data.items.filter((r) => r.players < 2);
};

const getOptions = async () => {
  const { data } = await axios.get(`${API_URL}/options/records`);
  return data.items;
};

const gameCreated = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/rooms/records/${id}`);
  return data;
};

const getGameByRoomId = async (id: string) => {
  const { data } = await axios.get(
    `${API_URL}/games/records/?filter=(room_id="${id}")`
  );
  return data.items[0];
};

const getPuntuations = async (id: string) => {
  const { data } = await axios.get(
    `${API_URL}/puntuations/records/?filter=(game_id="${id}")`
  );
  return data;
};

export {
  createRoom,
  updateRoom,
  getDisponibleRooms,
  newGame,
  updateGame,
  getOptions,
  gameCreated,
  getGameByRoomId,
  getPuntuations,
};
