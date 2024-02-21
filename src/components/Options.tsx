type Props = {
  action: () => void;
  icon: JSX.Element;
};

const Options = ({ action, icon }: Props) => {
  return (
    <li
      onClick={action}
      className="grid place-content-center rounded-md border-2 w-[110px] cursor-pointer h-[110px] text-5xl xl:w-[300px] xl:h-[300px] xl:text-9xl hover:border-sky-600"
    >
      {icon}
    </li>
  );
};

export default Options;
