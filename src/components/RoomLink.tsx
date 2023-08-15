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
    if (resp.playing === false) {
      body = {
        player1: "1ru61t6hjqbp97r",
        room_id: id,
      };
      const updRoom = {
        playing: true,
      };
      if (body === undefined) return;
      await newGame(body as GameBody);
      await updateRoom(id, updRoom);
    } else {
      const exists = await playerExisting();

      if (exists.player1 !== "") {
        body = {
          player2: "neq88cvlet2pa2w",
          status: true,
        };

        try {
          await updateGame(exists.id, body as GameBody);
          toast("play the game");
        } catch (error) {
          toast("Something Bad");
        }
      }
    }
  };

  return (
    <Link
      to="/vs"
      className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
      onClick={() => playGame(room.id)}
    >
      {room.name}
    </Link>
  );
};

export default RoomLink;
