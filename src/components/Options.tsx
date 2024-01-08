type Props = {
  action: () => void;
  icon: React.ReactNode;
};

const Options = ({ action, icon }: Props) => {
  return (
    <li
      onClick={action}
      className="grid place-content-center rounded-md border-2 w-[150px] cursor-pointer h-[150px] text-6xl xl:w-[400px] xl:h-[400px] xl:text-9xl hover:border-sky-600 "
    >
      {icon}
    </li>
  );
};

export default Options;
