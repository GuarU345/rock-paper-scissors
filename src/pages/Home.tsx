import { useEffect, useRef } from "react";
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
    <>
      <section className="grid place-content-center h-screen">
        <AnimationText />
        <Link type="button" to="/game" className="nes-btn text-base">
          PLAY GAME
        </Link>
        <Link type="button" to="/rooms" className="nes-btn text-base">
          ONLINE GAME
        </Link>
      </section>
    </>
  );
};

export default Home;
