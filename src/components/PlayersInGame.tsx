/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { gameCreated } from "../services/game";
import { socket } from "../socket/socket";

type Props = {
  players: number;
  room: string;
};

const PlayersInGame = ({ room }: Props) => {
  const [countPlayers, setCountPlayers] = useState(0);

  const countPlayersOnRoom = async () => {
    const resp = await gameCreated(room);
    setCountPlayers(resp.players);
  };

  useEffect(() => {
    countPlayersOnRoom();
    socket.on("playerInRoom", async () => {
      await countPlayersOnRoom();
    });
  }, []);

  return (
    <div className="flex justify-end">
      <p>players {countPlayers === 0 ? "0/2" : `${countPlayers}/2`}</p>
    </div>
  );
};

export default PlayersInGame;
