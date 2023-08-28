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
import useAuthStore from "../contexts/AuthContext";

const VsPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<finalOptions[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState("");
  const [game, setGame] = useState("");
  const location = useLocation();
  const game_id = location.state;
  const { getUserInfo } = useAuthStore();
  const user = getUserInfo();
  console.log(game);
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const gameStart = async () => {
    if (game === null) return;
    try {
      const resp = await getGameByRoomId(game);
      if (resp.status === true && resp.player1 !== "") {
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
    //decir a los jugadores que la sala esta disponible
    try {
      console.log(game);
      const resp = await getGameByRoomId(game_id);
      console.log(resp);
      //verificar cuantos jugadores hay en la partida
      if (resp.status) {
        const verifiedPlayer = user?.model.id;
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

  const handleYes = (event) => {
    event.preventDefault();
    confirmation();
  };

  const makeChoice = (choice: string) => {
    socket.emit("choice", choice);
    setIsOpen(true);
  };

  useEffect(() => {
    getGameOptions();
    socket.on("game_start", () => {
      setGameStarted(true);
    });

    socket.on("game_result", (gameResult: string) => {
      setResult(gameResult);
    });
  }, []);

  useEffect(() => {
    console.log(game_id);
    if (game_id !== null) {
      setGame(game_id);
    }
    gameStart();
  }, []);

  return (
    <>
      {!gameStarted ? (
        <div className="flex flex-col gap-2 h-screen text-center justify-center items-center">
          <p className="text-white">
            Esperando a que ambos jugadores se conecten
          </p>
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
                  action={() => makeChoice(option.name)}
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
          <Modal handleClose={closeModal}>${result}</Modal>
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
