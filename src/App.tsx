import { useState } from "react";
import "./App.css";
import { FaHandRock, FaHandScissors } from "react-icons/fa";
import { LiaToiletPaperSolid } from "react-icons/lia";
import { OPTIONS, WINNER_OPTIONS } from "./constants.tsx";
import Modal from "./components/Modal";
import Options from "./components/Options.tsx";
import confetti from "canvas-confetti";
import Results from "./components/Results.tsx";
import { generateOptionOfCpu } from "./functions/random.ts";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [userOption, setUserOption] = useState<JSX.Element | undefined>();
  const [cpuOption, setCpuOption] = useState<JSX.Element | undefined>();

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
      return;
    }
    setIsOpen(true);
    setText("You Lost");
    setUserOption(element);
    setCpuOption(cpuOption.element);
    return;
  };

  return (
    <>
      <h1 className="text-2xl text-center text-white">Rock Paper Scissors</h1>
      <main className="grid place-content-center h-full pb-4 overflow-hidden">
        <ul className="flex flex-col items-center pt-6 text-white gap-3 md:flex-row md:justify-center">
          <Options
            action={() => game(OPTIONS.rock.value, OPTIONS.rock.element)}
            icon={<FaHandRock />}
          />
          <Options
            action={() => game(OPTIONS.paper.value, OPTIONS.paper.element)}
            icon={<LiaToiletPaperSolid />}
          />
          <Options
            action={() =>
              game(OPTIONS.scissors.value, OPTIONS.scissors.element)
            }
            icon={<FaHandScissors />}
          />
        </ul>
      </main>
      {isOpen ? (
        <div>
          <Modal text={text} handleClose={closeModal}>
            <Results user={userOption} cpu={cpuOption} action={closeModal} />
          </Modal>
        </div>
      ) : null}
    </>
  );
}

export default App;
