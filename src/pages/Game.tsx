/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../shared/Modal.tsx";
import Options from "../components/Options.tsx";
import confetti from "canvas-confetti";
import Results from "../components/Results.tsx";
import { useEffect, useState } from "react";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { OPTIONS, WINNER_OPTIONS } from "../constants.tsx";
import { generateOptionOfCpu } from "../functions/random.ts";
import { Link } from "react-router-dom";
import { FaHandRock, FaHandScissors } from "react-icons/fa";
import { LiaToiletPaperSolid } from "react-icons/lia";
import Loading from "../components/Loading.tsx";
import Puntuations from "../components/Puntuations.tsx";
import { toast } from "sonner";
import Layout from "../components/Layout.tsx";
import { useSongStore } from "../store/SongStore.ts";

const Game = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [userOption, setUserOption] = useState<JSX.Element | undefined>();
  const [cpuOption, setCpuOption] = useState<JSX.Element | undefined>();
  const [userPuntuation, setUserPuntuation] = useState(0);
  const [cpuPuntuation, setCpuPuntuation] = useState(0);
  const { isPlaying, setIsPlaying, playMusic } = useSongStore();

  const closeModal = () => {
    setIsOpen(false);
  };

  const game = (option: number, element: JSX.Element) => {
    const cpuOption = generateOptionOfCpu();
    if (option === cpuOption.value) {
      setIsOpen(true);
      setText("Draw");
      setUserOption(element);
      setCpuOption(cpuOption.element);
      return;
    }
    if (WINNER_OPTIONS[option] == cpuOption.value) {
      setIsOpen(true);
      confetti();
      setText("You Win");
      setUserOption(element);
      setCpuOption(cpuOption.element);
      setUserPuntuation((userPuntuation) => userPuntuation + 1);
      return;
    }
    setIsOpen(true);
    setText("You Lost");
    setUserOption(element);
    setCpuOption(cpuOption.element);
    setCpuPuntuation((cpuPuntuation) => cpuPuntuation + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (isPlaying) {
        return;
      }
      playMusic();
      setIsPlaying(true);
    }, 900);
  }, []);

  useEffect(() => {
    if (userPuntuation === 10) {
      toast("User win game");
      setUserPuntuation(0);
      setCpuPuntuation(0);
    } else if (cpuPuntuation === 10) {
      toast("Cpu win game");
      setUserPuntuation(0);
      setCpuPuntuation(0);
    }
  }, [cpuPuntuation, userPuntuation]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <>
            <h1 className="gap-2 flex justify-center font-bold text-center text-white xl:text-4xl xl:gap-2 h-[5%]">
              <p className="text-gray-400">
                <GiStoneBlock />
              </p>
              Rock Paper Scissors
              <p className="text-red-600">
                <BsScissors />
              </p>
            </h1>
            <Puntuations
              userPuntuation={userPuntuation}
              cpuPuntuation={cpuPuntuation}
            />
            <main className="grid place-content-center h-[95%] pb-4 gap-y-2">
              <ul className="flex flex-col items-center text-white gap-3 md:flex-row md:justify-center">
                <Options
                  action={() => game(OPTIONS.rock.value, OPTIONS.rock.element)}
                  icon={<FaHandRock />}
                />
                <Options
                  action={() =>
                    game(OPTIONS.paper.value, OPTIONS.paper.element)
                  }
                  icon={<LiaToiletPaperSolid />}
                />
                <Options
                  action={() =>
                    game(OPTIONS.scissors.value, OPTIONS.scissors.element)
                  }
                  icon={<FaHandScissors />}
                />
              </ul>
              <div className="flex justify-center">
                <Link
                  type="button"
                  to="/home"
                  className="nes-btn md:w-[32.75%] md:py-2 md:m-auto xl:w-[32.75%] xl:m-auto xl:py-4 is-error"
                >
                  Back to home
                </Link>
              </div>
            </main>
          </>
        </Layout>
      )}

      {isOpen ? (
        <div>
          <Modal handleClose={closeModal}>
            <Results
              text={text}
              user={userOption}
              cpu={cpuOption}
              action={closeModal}
            />
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default Game;
