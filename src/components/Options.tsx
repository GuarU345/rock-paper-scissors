type Props = {
  action: () => void;
  icon: React.ReactNode;
};

const Options = ({ action, icon }: Props) => {
  return (
    <li
      onClick={action}
      className="grid place-content-center border-2 w-[200px] cursor-pointer h-[200px] text-6xl xl:w-[400px] xl:h-[400px] xl:text-9xl"
    >
      {icon}
    </li>
  );
};

export default Options;
