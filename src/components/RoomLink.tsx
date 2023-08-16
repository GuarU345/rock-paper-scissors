/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { GameBody, Room } from "../types";
import {
  gameCreated,
  newGame,
  playerExisting,
  updateGame,
  updateRoom,
} from "../services/game";
import { toast } from "sonner";

type Props = {
  room: Room;
};

const RoomLink = ({ room }: Props) => {
  const playGame = async (id: string) => {
    const resp = await gameCreated(id);
    let body;
    if (resp.status === false) {
      body = {
        player1: "k5kdf0llxemppym",
        room_id: id,
      };
      const updRoom = {
        status: true,
        players: 1,
      };
      if (body === undefined) return;
      await newGame(body as GameBody);
      await updateRoom(id, updRoom);
      toast("you are the player1");
    } else {
      const exists: any = await playerExisting(id);
      const player = localStorage.getItem("player");
      if (exists.player1 !== "" && exists.player1 != player) {
        body = {
          player2: "neq88cvlet2pa2w",
          status: true,
        };
        const updRoom = {
          players: 2,
        };
        try {
          await updateGame(exists.id, body as GameBody);
          await updateRoom(id, updRoom);
          localStorage.setItem("ready", exists.id);
          toast("play the game");
        } catch (error) {
          toast("Something Bad");
        }
      } else {
        toast("user is in room");
      }
    }
  };

  return (
    <Link
      to="/vs"
      state={room.id}
      className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
      onClick={() => playGame(room.id)}
    >
      {room.name}
    </Link>
  );
};

export default RoomLink;
