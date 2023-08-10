import { Link } from "react-router-dom";
import { Room } from "../types";
import { newGame } from "../services/game";

type Props = {
  room: Room;
};

const RoomLink = ({ room }: Props) => {
  const playGame = async (id: string) => {
    return;
    const body = {
      player1: "k5kdf0llxemppym",
      id_room: id,
    };
    await newGame(body);
  };

  return (
    <Link
      key={room.id}
      to="/game"
      className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
      onClick={() => playGame(room.id)}
    >
      {room.name}
    </Link>
  );
};

export default RoomLink;
