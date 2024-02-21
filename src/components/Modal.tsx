import { PropsWithChildren, useEffect } from "react";

type Props = {
  handleClose: () => void;
  height?: string;
};

const Modal = ({ children, handleClose, height }: PropsWithChildren<Props>) => {
  const close = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", close);

    return () => document.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="absolute flex flex-col justify-center items-center gap-10 top-0 left-0 h-full w-full bg-black bg-opacity-50 z-10">
      {children}
    </section>
  );
};

export default Modal;
