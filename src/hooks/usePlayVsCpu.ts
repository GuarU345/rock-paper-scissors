import confetti from "canvas-confetti";
import { RESULTS_TEXT, WINNER_OPTIONS } from "../utils/constants";
import { generateOptionOfCpu } from "../utils/functions";
import { RESULTMODALID } from "../utils/modal-ids";
import { useModalStore } from "../store/ModalStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePlayVsCpu = () => {
    const { showModal } = useModalStore()
    const [userPuntuation, setUserPuntuation] = useState(0);
    const [cpuPuntuation, setCpuPuntuation] = useState(0);

    const game = (option: number, element: JSX.Element) => {
        const cpuOption = generateOptionOfCpu();
        let text = ""

        if (option === cpuOption.value) {
            text = RESULTS_TEXT.DRAW
        }
        else if (WINNER_OPTIONS[option] == cpuOption.value) {
            text = RESULTS_TEXT.WIN
            confetti();
            setUserPuntuation((userPuntuation) => userPuntuation + 1);
        } else {
            text = RESULTS_TEXT.LOST
            setCpuPuntuation((cpuPuntuation) => cpuPuntuation + 1);
        }
        showModal(RESULTMODALID, { text, userOptionElement: element, cpuOptionElement: cpuOption.element })
    };

    useEffect(() => {
        if (userPuntuation === 10) {
            toast("User win game");
            setUserPuntuation(0);
            setCpuPuntuation(0);
        } else if (cpuPuntuation === 10) {
            toast("Cpu win game");
            setUserPuntuation(0);
            setCpuPuntuation(0);
        }
    }, [cpuPuntuation, userPuntuation]);

    return { game, userPuntuation, cpuPuntuation }
}