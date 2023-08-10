export interface Room {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  playing: boolean;
}

export interface Response<T = unknown> {
  items: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface RoomBody {
  name?: string;
  playing: boolean;
}

export interface Game {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  player1: string;
  player2: string;
}
