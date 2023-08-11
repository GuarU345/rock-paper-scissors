import { useEffect, useRef } from "react";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";
import { Link } from "react-router-dom";
import AnimationText from "../components/AnimationText";

const Home = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const elementsToAppear =
        elementRef.current?.querySelectorAll(".animate-appear");

      elementsToAppear?.forEach((element) => {
        element.classList.remove("opacity-0");
      });
    }
  }, []);

  return (
    <div className="grid place-content-center h-screen text-center text-white text-6xl">
      <AnimationText />
      <Link
        type="button"
        to="/game"
        className="border-2 p-2 text-base mt-4 rounded-md hover:border-sky-600"
      >
        PLAY GAME
      </Link>
      <Link
        type="button"
        to="/rooms"
        className="border-2 p-2 text-base mt-4 rounded-md hover:border-sky-600"
      >
        ONLINE GAME
      </Link>
    </div>
  );
};

export default Home;
