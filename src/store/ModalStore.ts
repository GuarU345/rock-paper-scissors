import { create } from "zustand";
import { CONFIGMODALID, RESULTMODALID } from "../utils/modal-ids";
import { Results } from "../modals/Results"
import { Configuration } from "../modals/Configuration";

interface ModalState {
    id: string | symbol
    props: any
}

interface ModalElement {
    [key: string | symbol]: React.ElementType
}

interface State {
    isOpen: boolean,
    select: ModalState | null,
    modals: ModalElement
}

interface Actions {
    showModal: <T = unknown>(id: string | symbol, props?: T) => void;
    hideModal: () => void;
}

const modals = {
    [RESULTMODALID]: Results,
    [CONFIGMODALID]: Configuration
}

export const useModalStore = create<State & Actions>((set) => ({
    isOpen: false,
    select: null,
    modals,
    showModal: <T = unknown>(id: string | symbol, props: T) => set({
        isOpen: true,
        select: {
            id, props
        }
    }),
    hideModal: () => set({ select: null, isOpen: false })
}))