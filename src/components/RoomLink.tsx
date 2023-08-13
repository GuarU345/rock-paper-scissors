import { Link } from "react-router-dom";
import { GameBody, Room } from "../types";
import { gameCreated, newGame, playerExisting, updateGame, updateRoom } from "../services/game";
import { toast } from "sonner";

type Props = {
  room: Room;
};

const RoomLink = ({ room }: Props) => {
  const playGame = async (id: string) => {
    const resp = await gameCreated(id)
    let body
    if (resp.playing === false){
      body = {
        player1: "hpzlur2ey4sqpz8",
        room_id: id,
      };
    }
    const resp2 = await playerExisting()
    console.log(resp2)
   
    return
    // if(){
    //   body = {
    //     player2: "hlm8qrq4cfgn93r",
    //     status:true
    //   };
    //   const room = {
    //     playing:true
    //   }
    //  try {
    //   await updateGame(resp.id,body as GameBody)
    //   await updateRoom(id,room)
    //   toast("play the game")
    //  } catch (error) {
    //   toast("Something Bad")
    //  }
    //  return
    // }
    // if(body === undefined) return
    // await newGame(body as GameBody);
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
