type Props = {
  userPuntuation: number;
  cpuPuntuation: number;
};

const Puntuations = ({ userPuntuation, cpuPuntuation }: Props) => {
  return (
    <section className="flex text-white gap-2 ml-10">
      <h1>Player</h1>
      <span>{userPuntuation}</span>
      <h1>Cpu</h1>
      <span>{cpuPuntuation}</span>
    </section>
  );
};

export default Puntuations;
