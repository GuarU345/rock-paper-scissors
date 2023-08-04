import { ReactNode } from "react";

type Props = {
  user: ReactNode;
  cpu: ReactNode;
};

const Results = ({ user, cpu }: Props) => {
  return (
    <div className="flex flex-col text-white items-center gap-2">
      <section>
        <p className="text-center">You</p>
        <span className="text-6xl">{user}</span>
      </section>

      <section>
        <p className="text-center">Oponent</p>
        <span className="text-6xl [&>svg]:m-auto">{cpu}</span>
      </section>
    </div>
  );
};

export default Results;
