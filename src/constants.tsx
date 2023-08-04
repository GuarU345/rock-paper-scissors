import { FaHandRock, FaHandScissors } from "react-icons/fa";
import { LiaToiletPaperSolid } from "react-icons/lia";

const OPTIONS = {
  rock: {
    value: 1,
    element: <FaHandRock />,
  },
  paper: {
    value: 2,
    element: <LiaToiletPaperSolid />,
  },
  scissors: {
    value: 3,
    element: <FaHandScissors />,
  },
};

const WINNER_OPTIONS: { [index: number]: number } = {
  1: 3, //piedra le gana a tijeras
  3: 2, //tijeras le gana a papel
  2: 1, //papel le gana piedra
};

export { OPTIONS, WINNER_OPTIONS };
