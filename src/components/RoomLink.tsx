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
import useAuthStore from "../contexts/AuthStore";
import { socket } from "../socket/socket";

type Props = {
  room: Room;
};

const RoomLink = ({ room }: Props) => {
  const navigate = useNavigate();
  const { userId } = useAuthStore();

  const playGame = async (roomId: string) => {
    const resp = await gameCreated(roomId);
    let body;
    if (resp.status === false) {
      body = {
        player1: userId,
        room_id: roomId,
      };
      const updRoom = {
        status: true,
        players: 1,
      };
      if (body === undefined) return;
      try {
        await newGame(body as GameBody);
        await updateRoom(roomId, updRoom);
        socket.emit("playerGoToRoom");
      } catch (error) {
        toast(`${error}`);
      }
      navigate("/vs", { state: null });
      toast("you are the player1");
    } else {
      const exists: any = await getGameByRoomId(roomId);
      const player = userId;
      if (exists.player1 !== "" && exists.player1 != player) {
        body = {
          player2: userId,
          status: true,
        };
        const updRoom = {
          players: 2,
        };
        try {
          await updateGame(exists.id, body as GameBody);
          await updateRoom(roomId, updRoom);
        } catch (error) {
          toast("Something Bad");
        }
        navigate("/vs", { state: roomId });
        toast("play the game");
      } else {
        toast("user in room");
      }
    }
  };

  const handlePlay = async () => {
    await playGame(room.id);
  };

  return (
    <>
      <a className="flex flex-col border-2 h-16" onClick={handlePlay}>
        <p>{room.name}</p>
        <PlayersInGame players={room.players} room={room.id} />
      </a>
    </>
  );
};

export default RoomLink;
