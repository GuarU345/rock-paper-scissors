/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Options from "../components/Options";
import { OPTIONS_v2 } from "../utils/constants";
import {
  getGameByRoomId,
  getOptions,
  updateGame,
  updateRoom,
} from "../services/game";
import { GameOptions, OptionsV2, finalOptions } from "../types";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { toast } from "sonner";
import { socket } from "../socket/socket";
import useAuthStore from "../store/AuthStore";
import Loading from "../components/Loading";
import confetti from "canvas-confetti";

const VsPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<finalOptions[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");
  const [roomId, setRoomId] = useState("");
  const location = useLocation();
  const room_id = location.state;

  const { userId } = useAuthStore();
  const navigate = useNavigate();
  const getGameOptions = async () => {
    const resp = await getOptions();
    const data = resp
      .flatMap((r: GameOptions) =>
        OPTIONS_v2.map((o: OptionsV2) => {
          if (o.value !== r.value) return;
          return {
            name: r.name,
            value: o.value,
            element: o.element,
            id: r.id,
          };
        })
      )
      .filter((r: any) => r !== undefined);
    setOptions(data);
  };

  const restartGame = () => {
    setResult("");
    setResult2("");
    setIsOpen(false);
    socket.emit("continue_game");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const gameStart = async () => {
    if (room_id === null) return;
    try {
      const resp = await getGameByRoomId(room_id);
      if (
        (resp.status === true && resp.player1 !== "") ||
        (resp.status === true && resp.player2 !== "")
      ) {
        socket.emit("game_ready", room_id);
      }
    } catch (error) {
      toast(`${error}`);
    }
  };

  const leaveRoom = () => {
    setConfirm(true);
  };

  const confirmation = async () => {
    if (roomId === null) return;
    try {
      const resp = await getGameByRoomId(roomId);
      //verificar cuantos jugadores hay en la partida
      if (resp.status) {
        const verifiedPlayer = userId;
        const userInRoom = resp.player1;
        if (userInRoom === verifiedPlayer) {
          const body = {
            player1: "",
            status: false,
          };
          const updRoom = {
            players: 1,
          };
          await updateGame(resp.id, body);
          await updateRoom(roomId, updRoom);
          socket.emit("leave_room");
          navigate("/rooms");
        } else {
          const body = {
            player2: "",
            status: false,
          };
          const updRoom = {
            players: 1,
          };
          await updateGame(resp.id, body);
          await updateRoom(roomId, updRoom);
          socket.emit("leave_room");
          navigate("/rooms");
        }
      }
    } catch (error) {
      toast(`${error}`);
    }
  };

  const handleYes = () => {
    confirmation();
  };

  const makeChoice = (choice: string, user: string) => {
    socket.emit("choice", choice, user);
  };

  useEffect(() => {
    getGameOptions();

    const handleGameStart = (actualRoomId: string) => {
      setRoomId(actualRoomId);
      setGameStarted(true);
    };

    const handleGameResult = (gameResult: any, gameResult2: any) => {
      if (gameResult === "Empate") {
        setResult(gameResult);
        setIsOpen(true);
        setTimeout(restartGame, 5000);
        return;
      }

      if (gameResult.userId === userId) {
        setResult(gameResult.win);
        if (gameResult.win === "Ganaste") {
          confetti();
        }
      }

      if (gameResult2.userId === userId) {
        setResult2(gameResult2.win);
      }

      setIsOpen(true);
      setTimeout(restartGame, 5000);
    };

    const handleRestartGame = () => {
      console.log("reiniciando juego...");
    };

    const handleLeaveRoom = () => {
      setConfirm(false);
      setGameStarted(false);
    };

    socket.on("game_start", handleGameStart);
    socket.on("game_result", handleGameResult);
    socket.on("restart_game", handleRestartGame);
    socket.on("leave_room", handleLeaveRoom);

    return () => {
      socket.off("game_start", handleGameStart);
      socket.off("game_result", handleGameResult);
      socket.off("restart_game", handleRestartGame);
      socket.off("leave_room", handleLeaveRoom);
    };
  }, []);

  useEffect(() => {
    gameStart();
  }, []);

  return (
    <>
      {!gameStarted ? (
        <Loading text={"Esperando a que ambos jugadores se conecten"} />
      ) : (
        <>
          <section className="mb-4">
            <h1 className="text-2xl flex gap-2 justify-center font-bold text-center text-white xl:text-4xl h-[5%]">
              <span className="text-gray-400">
                <GiStoneBlock />
              </span>
              Rock Paper Scissors
              <span className="text-red-600">
                <BsScissors />
              </span>
            </h1>
          </section>
          <main className="grid place-content-center h-[95%] pb-4 gap-y-2">
            <ul className="flex flex-col items-center pt-6 text-white gap-3 md:flex-row md:justify-center">
              {options.map((option) => (
                <Options
                  action={() => makeChoice(option.name, userId as string)}
                  icon={option.element}
                  key={option.id}
                ></Options>
              ))}
            </ul>
            <button onClick={leaveRoom} className="nes-btn is-error">
              Back to rooms
            </button>
          </main>
        </>
      )}

      {isOpen ? (
        <div>
          <Modal height={"h-full"} handleClose={closeModal}>
            <div className="grid place-content-center gap-4 text-white">
              <section>
                <h4 className="text-center">{result}</h4>
              </section>
              <section>
                <h4 className="text-center">{result2}</h4>
              </section>
              {/* <button className="nes-btn" onClick={restartGame}>
                Restart Game?
              </button> */}
            </div>
          </Modal>
        </div>
      ) : null}

      {confirm ? (
        <Modal height={"h-full"} handleClose={closeModal}>
          <div className="flex flex-col justify-center items-center gap-2 p-2">
            <h3 className="text-white text-sm text-center">
              you want to leave the room?
            </h3>
            <div className="flex">
              <button onClick={handleYes} className="nes-btn is-success">
                Yes
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="nes-btn is-error"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default VsPlayer;
