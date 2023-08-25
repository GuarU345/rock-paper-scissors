/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { GameBody, Room } from "../types";
import {
  gameCreated,
  getGameByRoomId,
  newGame,
  updateGame,
  updateRoom,
} from "../services/game";
import { toast } from "sonner";
import PlayersInGame from "./PlayersInGame";
import useAuthStore from "../contexts/AuthContext";
import { socket } from "../socket/socket";

type Props = {
  room: Room;
  updateRooms: () => Promise<void>;
};

const RoomLink = ({ room, updateRooms }: Props) => {
  const navigate = useNavigate();
  const { getUserInfo } = useAuthStore();
  const userInfo = getUserInfo();

  const playGame = async (id: string) => {
    const resp = await gameCreated(id);
    let body;
    if (resp.status === false) {
      body = {
        player1: userInfo?.model.id,
        room_id: id,
      };
      const updRoom = {
        status: true,
        players: 1,
      };
      if (body === undefined) return;
      try {
        await newGame(body as GameBody);
        await updateRoom(id, updRoom);
        socket.emit("playerGoToRoom");
      } catch (error) {
        toast(`${error}`);
      }
      navigate("/vs", { state: null });
      toast("you are the player1");
    } else {
      const exists: any = await getGameByRoomId(id);
      const player = userInfo?.model.id;
      if (exists.player1 !== "" && exists.player1 != player) {
        body = {
          player2: userInfo?.model.id,
          status: true,
        };
        const updRoom = {
          players: 2,
        };
        try {
          Promise.all([
            updateGame(exists.id, body as GameBody),
            updateRoom(id, updRoom),
          ]);
        } catch (error) {
          toast("Something Bad");
        }
        navigate("/vs", { state: room.id });
        toast("play the game");
      } else {
        toast("user in room");
      }
    }
  };

  return (
    <>
      <a
        className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
        onClick={async () => await playGame(room.id)}
      >
        {room.name}
        <PlayersInGame players={room.players} room={room.id} />
      </a>
    </>
  );
};

export default RoomLink;
