/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import PocketBase from "pocketbase";
import { Room, Response, Game, GameBody } from "../types";

const API_URL = "https://rps-db.pockethost.io/api/collections";

const pb = new PocketBase("https://rps-db.pockethost.io");

const createRoom = async (body: string) => {
  try {
    const { data } = await axios.post<Room>(`${API_URL}/rooms/records`, {
      name: body,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const updateRoom = async (id: string, room: any) => {
  try {
    const { data } = await axios.patch(`${API_URL}/rooms/records/${id}`, room);
    return data;
  } catch (error) {
    return error;
  }
};

const newGame = async (body: GameBody) => {
  try {
    const { data } = await axios.post<Game>(`${API_URL}/games/records`, body);
    return data;
  } catch (error) {
    return error;
  }
};

const updateGame = async (id: string, body: GameBody) => {
  try {
    const { data } = await axios.patch(`${API_URL}/games/records/${id}`, body);
    return data;
  } catch (error) {
    return error;
  }
};

const getDisponibleRooms = async () => {
  try {
    const { data } = await axios.get<Response<Room>>(
      `${API_URL}/rooms/records`
    );
    return data.items.filter(r => r.players < 2);
  } catch (error) {
    return error;
  }
};

const getOptions = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/options/records`);
    return data.items;
  } catch (error) {
    return error;
  }
};

const gameCreated = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/rooms/records/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

const getGameByRoomId = async(id:string) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/games/records/?filter=(room_id="${id}")`
    );
    return data.items[0];
  } catch (error) {
    return error;
  }
}

export {
  createRoom,
  updateRoom,
  getDisponibleRooms,
  newGame,
  updateGame,
  getOptions,
  gameCreated,
  getGameByRoomId
};
