import { ReactNode } from "react";

type Props = {
  text: string;
  user: ReactNode;
  cpu: ReactNode;
  action: () => void;
};

const Results = ({ text, user, cpu, action }: Props) => {
  return (
    <div className="flex flex-col text-white items-center gap-2">
      <h1 className="text-xl text-white">{text}</h1>
      <section>
        <p className="text-center">You</p>
        <span className="text-6xl">{user}</span>
      </section>

      <section>
        <p className="text-center">Oponent</p>
        <span className="text-6xl [&>svg]:m-auto">{cpu}</span>
      </section>
      <section>
        <button onClick={action} className="p-2 mt-4 text-white border-2">
          Restart game
        </button>
      </section>
    </div>
  );
};

export default Results;
