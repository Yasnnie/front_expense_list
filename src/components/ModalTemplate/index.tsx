import {
  useState,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  ReactNode,
} from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";

export interface ModalMethods {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalProps {
  children: ReactNode;
  onCloseModal?: ()=> void
}

const ModalTemplate = forwardRef<ModalMethods, ModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if(props.onCloseModal) props.onCloseModal()
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!isOpen) return null;

  return (
    <Container>
      <div className="c-modal__background" onClick={closeModal} />
      <section className="c-modal__content">{props.children}</section>
    </Container>
  );
});

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 20;

  .c-modal__background {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #00000055;
  }

  .c-modal__content {
    position: relative;
    z-index: 22;
    background: ${theme.white};
    padding: 24px;
    border-radius: 10px;
    max-width: calc(100% - 48px);
  }
`;

export default ModalTemplate;
