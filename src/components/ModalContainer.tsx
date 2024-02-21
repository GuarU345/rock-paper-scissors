import { useModalStore } from "../store/ModalStore";


export function ModalContainer() {
  const { isOpen, modals, select } = useModalStore()

  const renderModal = () => {
    if (select === null) return null;
    const { id, props } = select;

    const Component = modals[id];

    return <Component {...props} />
  };

  return isOpen && renderModal()
}
