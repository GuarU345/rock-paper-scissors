/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import Options from "../components/Options";
// import { OPTIONS_v2, WINNER_OPTIONS } from "../constants";
// import { getOptions } from "../services/game";
// import { GameOptions, OptionsV2 } from "../types";
// import { generateOptionOfCpu } from "../functions/random";
// import confetti from "canvas-confetti";
// import { BsScissors } from "react-icons/bs";
// import { GiStoneBlock } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import Modal from "../components/Modal";
// import Results from "../components/Results";

const VsPlayer = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [options, setOptions] = useState([]);
  // const [text, setText] = useState("");
  // const [userOption, setUserOption] = useState<JSX.Element | undefined>();
  // const [cpuOption, setCpuOption] = useState<JSX.Element | undefined>();
  const finalized = false;

  // const getGameOptions = async () => {
  //   const resp = await getOptions();
  //   const data = resp
  //     .flatMap((r: GameOptions) =>
  //       OPTIONS_v2.map((o: OptionsV2) => {
  //         if (o.value !== r.value) return;
  //         return {
  //           name: r.name,
  //           value: o.value,
  //           element: o.element,
  //           id: r.id,
  //         };
  //       })
  //     )
  //     .filter((r: any) => r !== undefined);
  //   setOptions(data);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const game = (option: number, element: JSX.Element) => {
  //   const cpuOption = generateOptionOfCpu();
  //   if (option === cpuOption.value) {
  //     setIsOpen(true);
  //     setText("Draw");
  //     setUserOption(element);
  //     setCpuOption(cpuOption.element);
  //     return;
  //   }
  //   if (WINNER_OPTIONS[option] == cpuOption.value) {
  //     setIsOpen(true);
  //     confetti();
  //     setText("You Win");
  //     setUserOption(element);
  //     setCpuOption(cpuOption.element);
  //     return;
  //   }
  //   setIsOpen(true);
  //   setText("You Lost");
  //   setUserOption(element);
  //   setCpuOption(cpuOption.element);
  //   return;
  // };

  // useEffect(() => {}, []);
  return (
    <>
      {finalized === false ? (
        <h1 className="text-white text-6xl text-center">En construccion</h1>
      ) : null}
      {/* {loading ? //     viewBox="0 0 100 101" //     className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" //     aria-hidden="true" //   <svg // <div className="grid h-screen place-content-center">
      //     fill="none"
      //     xmlns="http://www.w3.org/2000/svg"
      //   >
      //     <path
      //       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      //       fill="currentColor"
      //     />
      //     <path
      //       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      //       fill="currentFill"
      //     />
      //   </svg>
      //   <span className="sr-only">Loading...</span>
      // </div>
      null : (
        <>
          <h1 className="text-2xl flex gap-2 justify-center font-bold text-center text-white xl:text-4xl h-[5%]">
            <span className="text-gray-400">
              <GiStoneBlock />
            </span>
            Rock Paper Scissors
            <span className="text-red-600">
              <BsScissors />
            </span>
          </h1>
          <main className="grid place-content-center h-[95%] pb-4 gap-y-2">
            <ul className="flex flex-col items-center pt-6 text-white gap-3 md:flex-row md:justify-center">
              {options.map((option) => (
                <Options
                  action={() => game(option.value, option.element)}
                  icon={option.element}
                  key={option.id}
                ></Options>
              ))}
            </ul>
            <Link
              type="button"
              to="/rooms"
              className="text-white rounded-md text-center border-2 py-2 md:w-[32.75%] md:py-2 md:m-auto xl:w-[32.75%] xl:m-auto xl:py-4 hover:border-red-600"
            >
              Back to rooms
            </Link>
          </main>
        </>
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
      ) : null} */}
    </>
  );
};

export default VsPlayer;
