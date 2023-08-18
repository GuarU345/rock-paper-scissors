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
import { useEffect, useState } from "react";

type Props = {
  room: Room;
};

const RoomLink = ({ room }: Props) => {
  const navigate = useNavigate()
  const [players,setPlayers] = useState(0)
  
  const countPlayersOnRoom = async() => {
    if(room.players > 0){
      const resp = await gameCreated(room.id)
      setPlayers(resp.players)
    }
  }
  
  const playGame = async (id: string) => {
    const resp = await gameCreated(id);
    let body;
    if (resp.status === false) {
      body = {
        player1: "xn8n0bsyo0p5vxw",
        room_id: id,
      };
      const updRoom = {
        status: true,
        players: 1,
      };
      if (body === undefined) return;
      try {
        await Promise.all([newGame(body as GameBody),updateRoom(id, updRoom)])
      } catch (error) {
        toast(`${error}`)
      }
      navigate("/vs",{state:null})
      toast("you are the player1")
    } else {
      const exists: any = await getGameByRoomId(id);
      const player = localStorage.getItem("player");
      if (exists.player1 !== "" && exists.player1 != player) {
        body = {
          player2: "7kz4qa9i3rl3n6o",
          status: true,
        };
        const updRoom = {
          players: 2,
        };
        try {
          Promise.all([updateGame(exists.id, body as GameBody),
          updateRoom(id, updRoom)])
        } catch (error) {
          toast("Something Bad");
        }
        navigate("/vs",{state:room.id})
        toast("play the game");
      } else {
        toast("user is in room");
      }
    }
  };

  useEffect(() => {
    countPlayersOnRoom()
  },[])

  return (
    <>
     <a
      className="flex font-bold items-center gap-2 rounded-t-md text-white w-full border-2 p-4 h-10 hover:border-sky-400 sm:w-1/2 md:w-1/2 xl:w-1/2 xl:p-6"
      onClick={async() =>  await playGame(room.id)}
    >
      {room.name}
      <p className="text-white ml-auto text-sm">players {players === 0 ? '0/2' : `${players}/2`}</p>
    </a>
   
    </>
  );
};

export default RoomLink;
