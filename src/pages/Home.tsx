import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimationText from "../components/AnimationText";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import ConfigurationModal from "../modals/Configuration";

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
        <section className="grid place-content-center xl:mt-10">
          <AnimationText />
          <Link type="button" to="/game" className="nes-btn text-base">
            PLAY GAME
          </Link>
          {!import.meta.env.VITE_IsProd ? (
            <Link type="button" to="/rooms" className="nes-btn text-base">
              ONLINE GAME
            </Link>
          ) : null}
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
