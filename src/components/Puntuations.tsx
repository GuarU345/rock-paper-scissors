type Props = {
  userPuntuation: number;
  cpuPuntuation: number;
};

const Puntuations = ({ userPuntuation, cpuPuntuation }: Props) => {
  return (
    <section className="flex text-xs text-center text-white gap-4 justify-center mb-5">
      <h5 className="border-2 rounded-md p-2">
        Player: <span>{userPuntuation}</span>
      </h5>
      <p></p>
      <h5 className="border-2 rounded-md p-2">
        Cpu: <span>{cpuPuntuation}</span>
      </h5>
    </section>
  );
};

export default Puntuations;
