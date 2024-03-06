import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { createExpense, editExpense } from "../../service";
import { theme } from "../../style/theme";
import { ExpenseCreate, ExpenseType } from "../../types";
import ModalTemplate, { ModalMethods } from "../ModalTemplate";

interface ModalCreateExpenseProps {
  createExpensive: (item: ExpenseType) => void;
  editExpense: (item: ExpenseType) => void;
}

export interface ModalMethodsCreate {
  openModal: (item?: ExpenseType) => void;
  closeModal: () => void;
}

const ModalCreateExpense = forwardRef<
  ModalMethodsCreate,
  ModalCreateExpenseProps
>((props, ref) => {
  const modalRef = useRef<ModalMethods>(null);
  const [formContent, setFormContent] = useState<ExpenseCreate>({
    description: "",
    date: "",
    value: 0.0,
    category: "",
  });

  const [err, setErr] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);

  const openModal = (item?: ExpenseType) => {
    if (item) {
      setFormContent({ ...item, date: formatDateInput(item.date)});
      setEditMode(item.id);
    }
    modalRef.current?.openModal();
  };

  const closeModal = () => modalRef.current?.closeModal();

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  function isExpenseCreateValid(expense: ExpenseCreate) {
    return Object.values(expense).every((value) => value !== "");
  }

  function formatDate(inputDate: string) {
    const parts = inputDate.split("-");
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
  }

  function formatDateInput(inputDate: string): string {
    const parts = inputDate.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }

  async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const isFormValid = isExpenseCreateValid(formContent);
    const formValue = { ...formContent, date: formatDate(formContent.date) };
  
    if (isFormValid) {
      if (editMode) {
        const res = await editExpense(editMode, formValue);
        props.editExpense(res);
      } else {
        const res = await createExpense(formValue);
        props.createExpensive(res);
      }
      closeModal();
    } else {
      setErr("Preencha todos os campos");
    }
  }

  return (
    <ModalTemplate
      onCloseModal={() => {
        setFormContent({
          description: "",
          date: "",
          value: 0.0,
          category: "",
        });
        setErr(null);
        setEditMode(null);
      }}
      ref={modalRef}
    >
      <Container>
        <h3>{editMode ? "Editar" : "Criar"} despesa</h3>
        {err && <p className="c-modal__err">{err}</p>}

        <form className="c-form">
          <input
            value={formContent.description}
            onChange={(e) =>
              setFormContent({ ...formContent, description: e.target.value })
            }
            className="c-form__input"
            placeholder="Descrição"
            type="text"
          />

          <div className="c-form__d-flex">
            <input
              value={formContent.date}
              className="c-form__input"
              type="date"
              onChange={(e) =>
                setFormContent({ ...formContent, date: e.target.value })
              }
            />
            <input
              onChange={(e) =>
                setFormContent({
                  ...formContent,
                  value: Number(e.target.value),
                })
              }
              value={formContent.value}
              className="c-form__input"
              type="number"
              placeholder="Valor"
            />
          </div>

          <select
            value={formContent.category}
            className="c-form__input"
            onChange={(e) =>
              setFormContent({ ...formContent, category: e.target.value })
            }
          >
            <option>Categoria</option>
            <option>Contas</option>
            <option>Casa</option>
            <option>Lazer</option>
            <option>Comida</option>
            <option>Carro</option>
            <option>Outras</option>
          </select>

          <button className="c-form__button" onClick={submit}>
            {editMode ? "Editar" : "Criar"}
          </button>
        </form>
      </Container>
    </ModalTemplate>
  );
});

const Container = styled.div`
  width: 100vw;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 16px;
    color: ${theme.primaryPurple};
  }

  .c-modal__err {
    color: #a50000;
    background: #ffa1a1;
    width: 100%;
    text-align: center;
    padding: 10px;
  }

  .c-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .c-form__d-flex {
      display: flex;
      gap: 16px;
    }

    .c-form__input {
      display: block;
      flex: 1;
      min-height: 44px;
      max-height: 44px;
      outline: none;
      padding: 0 12px;
      border: 1px solid ${theme.gray500};
      border-radius: 6px;
      font-size: 16px;
      color: #000;
    }

    .c-form__input::placeholder {
      color: #000;
    }

    .c-form__button {
      max-width: max-content;
      margin: 0 auto;
      background: ${theme.primaryPurple};
      border: none;
      color: ${theme.white};
      font-size: 18px;
      font-weight: 900;
      padding: 0 24px;
      height: 44px;
      border-radius: 6px;
      cursor: pointer;
    }
  }
`;

export default ModalCreateExpense;
