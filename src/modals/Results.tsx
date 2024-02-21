import Modal from "../components/Modal";
import { useModalStore } from "../store/ModalStore";

type Props = {
  text: string;
  userOptionElement: JSX.Element;
  cpuOptionElement: JSX.Element;
};

export const Results = ({ text, userOptionElement, cpuOptionElement }: Props) => {
  const { hideModal } = useModalStore()

  return (
    <Modal handleClose={hideModal}>
      <div className="flex flex-col text-white items-center gap-2 p-2 xl:w-[250px] bg-black border-2 rounded-lg">
        <h1 className="text-xl text-white">{text}</h1>
        <section>
          <p className="text-center">You</p>
          <span className="text-4xl">{userOptionElement}</span>
        </section>

        <section>
          <p className="text-center">Oponent</p>
          <span className="text-4xl [&>svg]:m-auto">{cpuOptionElement}</span>
        </section>
        <section>
          <button onClick={hideModal} className="nes-btn xl:w-32">
            Restart game
          </button>
        </section>
      </div>
    </Modal>

  );
};

