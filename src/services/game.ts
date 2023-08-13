/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import PocketBase from "pocketbase"
import { Room, Response, Game, GameBody } from "../types";

const API_URL = "http://localhost:8090/api/collections";

const pb = new PocketBase('http://127.0.0.1:8090')

const createRoom = async (body: string) => {
  const { data } = await axios.post<Room>(`${API_URL}/rooms/records`, {
    name: body,
  });
  return data;
};

const updateRoom = async (id:string,room:any) => {
  const {data} = await axios.patch(`${API_URL}/rooms/records/${id}`,room)
  return data
}

const newGame = async (body: GameBody) => {
  const { data } = await axios.post<Game>(`${API_URL}/games/records`, body);
  return data;
};

const updateGame = async(id:string,body: GameBody) => {
  const {data} = await axios.patch(`${API_URL}/games/records/${id}`,body)
  return data
}

const getDisponibleRooms = async () => {
  const { data } = await axios.get<Response<Room>>(`${API_URL}/rooms/records`);
  return data.items.filter((r) => r.playing === false);
};

const getOptions = async () => {
  const { data } = await axios.get(`${API_URL}/options/records`);
  return data.items;
};

const gameCreated = async(id:string) => {
  const {data} = await axios.get(`${API_URL}/rooms/records/${id}`)
  return data
}

const playerExisting = async() => {
  const data = await pb.collection('games').getList(1,1,{
    expand: 'Rooms'
  })
  return data.items[0]
}
  

export { 
  createRoom,
  updateRoom, 
  getDisponibleRooms, 
  newGame, 
  updateGame, 
  getOptions ,
  gameCreated,
  playerExisting
};
