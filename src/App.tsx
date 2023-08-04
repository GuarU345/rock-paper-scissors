import "./App.css";
import { FaHandRock, FaHandScissors } from "react-icons/fa";
import { LiaToiletPaperSolid } from "react-icons/lia";

function App() {
  return (
    <>
      <h1 className="text-2xl text-center text-white">Rock Paper Scissors</h1>
      <main>
        <ul className="flex flex-col items-center pt-6 text-white gap-3">
          <li className="grid place-content-center border-2 w-[200px] h-[200px] text-6xl">
            <FaHandRock />
          </li>
          <li className="grid place-content-center border-2 w-[200px] h-[200px] text-6xl">
            <LiaToiletPaperSolid />
          </li>
          <li className="grid place-content-center border-2 w-[200px] h-[200px] text-6xl">
            <FaHandScissors />
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
