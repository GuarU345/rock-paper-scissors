import { useEffect, useRef } from "react";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";

const AnimationText = () => {
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
    <div
      className="grid place-content-center text-center text-white text-4xl"
      ref={elementRef}
    >
      <h1 className="font-bold flex xl:gap-2 justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-900 ease-in animate-appear xl:text-8xl">
        <span className="text-gray-400">
          <GiStoneBlock />
        </span>
        Rock
      </h1>
      <h1 className="font-bold text-white  flex justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-500 ease-in animate-appear xl:text-8xl">
        Paper
        <span>
          <IoIosPaper className="text-yellow-400" />
        </span>
      </h1>
      <h1 className="font-bold text-white  flex justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-700 ease-in animate-appear xl:text-8xl">
        Sciss
        <span>
          <BsScissors className="text-red-600" />
        </span>
        ors
      </h1>
    </div>
  );
};

export default AnimationText;
