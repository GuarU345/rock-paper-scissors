/* eslint-disable @typescript-eslint/no-explicit-any */
import Options from "../components/Options.tsx";
import { useEffect, useState } from "react";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaHandRock, FaHandScissors } from "react-icons/fa";
import { LiaToiletPaperSolid } from "react-icons/lia";
import Loading from "../components/Loading.tsx";
import Puntuations from "../components/Puntuations.tsx";
import Layout from "../components/Layout.tsx";
import { useSongStore } from "../store/SongStore.ts";
import { usePlayVsCpu } from "../hooks/usePlayVsCpu.ts";
import { OPTIONS } from "../utils/constants.tsx";

const Game = () => {
  const [loading, setLoading] = useState(true);
  const { isPlaying, setIsPlaying, playMusic } = useSongStore();
  const { game, userPuntuation, cpuPuntuation } = usePlayVsCpu()

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
            <main className="grid place-content-center  pb-4 gap-y-2">
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
    </>
  );
};

export default Game;
