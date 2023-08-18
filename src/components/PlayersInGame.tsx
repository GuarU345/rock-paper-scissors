/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { gameCreated } from "../services/game";

type Props = {
  players: number;
  room: string;
};

const PlayersInGame = ({ players, room }: Props) => {
  const [countPlayers, setCountPlayers] = useState(0);

  const countPlayersOnRoom = async () => {
    if (players > 0) {
      const resp = await gameCreated(room);
      setCountPlayers(resp.players);
    }
  };

  useEffect(() => {
    countPlayersOnRoom();
  }, []);

  return (
    <p className="text-white ml-auto text-sm">
      players {countPlayers === 0 ? "0/2" : `${countPlayers}/2`}
    </p>
  );
};

export default PlayersInGame;
