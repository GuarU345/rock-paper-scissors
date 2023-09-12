import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimationText from "../components/AnimationText";
import Layout from "../components/Layout";
import Modal from "../shared/Modal";
import ConfigurationModal from "../shared/ConfigurationModal";

const Home = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (elementRef.current) {
      const elementsToAppear =
        elementRef.current?.querySelectorAll(".animate-appear");

      elementsToAppear?.forEach((element) => {
        element.classList.remove("opacity-0");
      });
    }
  }, []);

  return (
    <>
      <Layout>
        <section className="grid place-content-center h-screen xl:overflow-scroll">
          <AnimationText />
          <Link type="button" to="/game" className="nes-btn text-base">
            PLAY GAME
          </Link>
          <Link type="button" to="/rooms" className="nes-btn text-base">
            ONLINE GAME
          </Link>
          <button onClick={() => setIsOpen(true)} className="nes-btn">
            CONFIGURATION
          </button>
          {isOpen ? (
            <Modal handleClose={closeModal}>
              <ConfigurationModal handleClose={closeModal} />
            </Modal>
          ) : null}
        </section>
      </Layout>
    </>
  );
};

export default Home;
