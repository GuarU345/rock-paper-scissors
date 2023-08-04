import { PropsWithChildren, useEffect } from "react";

type Props = {
  text: string;
  handleClose: () => void;
};

const Modal = ({ children, text, handleClose }: PropsWithChildren<Props>) => {
  const close = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", close);

    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <div
        className="absolute flex flex-col top-0 left-0 h-full w-full bg-black bg-opacity-50"
        onClick={handleClose}
      >
        <div className="absolute border-2 top-1/2 left-1/2 transform w-4/6 -translate-x-1/2 -translate-y-1/2 bg-black shadow-2xl z-10 h-2/6 rounded-lg xl:w-2/6 xl:h-60">
          <section className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-white">{text}</h1>
            {children}
          </section>
        </div>
      </div>
    </>
  );
};

export default Modal;
