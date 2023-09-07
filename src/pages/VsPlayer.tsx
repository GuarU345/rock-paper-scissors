/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Options from "../components/Options";
import { OPTIONS_v2 } from "../constants";
import { getGameByRoomId, getOptions, updateGame } from "../services/game";
import { GameOptions, OptionsV2, finalOptions } from "../types";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { toast } from "sonner";
import { socket } from "../socket/socket";
import useAuthStore from "../contexts/AuthStore";
import Loading from "../components/Loading";

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

  const { userInfo } = useAuthStore();
  // const [text, setText] = useState("");
  // const [cpuOption,setCpuOption] = useState<JSX.Element | undefined>()
  // const [userOption, setUserOption] = useState<JSX.Element | undefined>();
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
      if (resp.status === true && resp.player1 !== "") {
        setRoomId(resp.room_id);
        socket.emit("game_ready");
      }
    } catch (error) {
      toast(`${error}`);
    }
  };

  const leaveRoom = () => {
    setConfirm(true);
  };

  const confirmation = async () => {
    console.log(roomId);
    if (roomId === null) return;
    try {
      const resp = await getGameByRoomId(roomId);
      console.log(resp);
      //verificar cuantos jugadores hay en la partida
      if (resp.status) {
        const verifiedPlayer = userInfo?.model.id;
        const userInRoom = resp.player1;
        if (userInRoom === verifiedPlayer) {
          const body = {
            player1: "",
          };
          await updateGame(resp.id, body);
        } else {
          const body = {
            player2: "",
          };
          await updateGame(resp.id, body);
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
    socket.on("game_start", () => {
      setGameStarted(true);
    });

    socket.on("game_result", (gameResult, gameResult2) => {
      if (gameResult.userId === userInfo?.model.id) {
        setResult(gameResult.win);
      }
      if (gameResult2.userId === userInfo?.model.id) {
        setResult2(gameResult2.win);
      }
      setIsOpen(true);
    });

    socket.on("restart_game", () => {
      console.log("reiniciando juego...");
    });
  }, []);

  useEffect(() => {
    gameStart();
  }, []);

  return (
    <>
      {!gameStarted ? (
        <Loading />
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
                  action={() =>
                    makeChoice(option.name, userInfo?.model.id as string)
                  }
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
              <button className="nes-btn" onClick={restartGame}>
                Restart Game?
              </button>
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
