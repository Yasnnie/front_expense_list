import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { deleteExpense } from "../../service";
import { theme } from "../../style/theme";
import { ExpenseType } from "../../types";
import ModalTemplate, { ModalMethods } from "../ModalTemplate";

interface ModalDeleteExpenseProps {
  idExpense: number;
  onDelete: (id: number) => void;
}

const ModalDeleteExpense = forwardRef<ModalMethods, ModalDeleteExpenseProps>(
  (props, ref) => {
    const modalRef = useRef<ModalMethods>(null);

    const openModal = () => modalRef.current?.openModal();
    const closeModal = () => modalRef.current?.closeModal();

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    async function detele() {
      try {
        await deleteExpense(props.idExpense);
        props.onDelete(props.idExpense);
        closeModal();
      } catch (_) {}
    }

    return (
      <ModalTemplate ref={modalRef}>
        <Container>
          <p className="c-modal__text">Deseja mesmo deletar essa despesa?</p>
          <button
            onClick={detele}
            className="c-modal__button c-modal__button--red"
          >
            Deletar
          </button>
          <button onClick={closeModal} className="c-modal__button">
            Cancelar
          </button>
        </Container>
      </ModalTemplate>
    );
  }
);

const Container = styled.div`
  width: 100vw;
  max-width: 400px;

  .c-modal__text {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 16px;
    color: #000;
  }

  .c-modal__button {
    width: calc(50% - 8px);
    height: 44px;
    background: #f1f1f1;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    & + button {
      margin-left: 16px;
    }
  }

  .c-modal__button--red {
    background: #c30000;
    color: ${theme.white};
  }
`;

export default ModalDeleteExpense;
