import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AnimationText from "../components/AnimationText";
import Layout from "../components/Layout";
import { CONFIGMODALID } from "../utils/modal-ids";
import { useModalStore } from "../store/ModalStore";

const Home = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { showModal } = useModalStore()

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
        <section className="grid place-content-center mt-20">
          <AnimationText />
          <Link type="button" to="/game" className="nes-btn text-base">
            PLAY GAME
          </Link>
          {!import.meta.env.VITE_IsProd ? (
            <Link type="button" to="/rooms" className="nes-btn text-base">
              ONLINE GAME
            </Link>
          ) : null}
          <button onClick={() => showModal(CONFIGMODALID)} className="nes-btn">
            CONFIGURATION
          </button>
        </section>
      </Layout>
    </>
  );
};

export default Home;
