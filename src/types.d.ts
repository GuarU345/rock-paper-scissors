import { ReactNode } from "react";
import { IconBaseProps } from "react-icons";

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

export interface GameBody {
  room_id?: string;
  player1: string;
  player2?: string;
  status?:boolean
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

export interface OptionsV2 {
  value: number;
  element: IconBaseProps;
}

export interface GameOptions {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  value: number;
}

export interface finalOptions {
  name: string;
  value: number;
  element: ReactNode;
  id: string;
}

export interface SignupBody {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SigninBody {
  identity:string
  password:string
}
