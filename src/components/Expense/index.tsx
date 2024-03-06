import styled from "styled-components";
import { theme } from "../../style/theme";
import Trash from "../../assets/icons/trash.svg";
import Edit from "../../assets/icons/edit-2.svg";
import { ExpenseType } from "../../types";
import { useRef } from "react";
import { ModalMethods } from "../ModalTemplate";
import ModalDeleteExpense from "../ModalDeleteExpense";

interface Props {
  expense: ExpenseType;
  onDelete: (id:number)=> void
  edit:()=> void
}

export default function Expense({ expense, onDelete, edit }: Props) {
  const modalRef = useRef<ModalMethods>(null);

  return (
    <>
      <ModalDeleteExpense onDelete={onDelete} idExpense={expense.id} ref={modalRef} />
      <Container>
        <p className="c-expense__text c-expense__text--bold">{expense.date}</p>
        <p className="c-expense__text c-expense__money">- R$ {expense.value}</p>
        <p className="c-expense__category">{expense.category}</p>
        <p className="c-expense__text c-expense__text--flex">
          {expense.description}
        </p>

        <button onClick={edit} className="c-expense__button">
          <img src={Edit} alt="Editar" />
        </button>

        <button className="c-expense__button c-expense__button--delete" onClick={()=> modalRef.current?.openModal()}>
          <img src={Trash} alt="excluir" />
        </button>
      </Container>
    </>
  );
}

const Container = styled.li`
  background: ${theme.white};
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 0 16px;
  gap: 20px;
  margin-top: 16px;

  .c-expense__text--flex {
    flex: 1;
  }

  .c-expense__text {
    font-size: 16px;
    font-weight: 450;
  }


  .c-expense__money{
    width: 110px;
  }

  .c-expense__text--bold {
    font-weight: 800;
  }

  .c-expense__button {
    height: 40px;
    width: 40px;
    cursor: pointer;
    background: ${theme.primaryPurple};
    border: none;
    border-radius: 6px;

    img {
      width: 22px;
    }
  }

  .c-expense__button--delete {
    background: #c30000;
  }

  .c-expense__category {
    padding: 6px;
    width: 72px;
    text-align: center;
    border: 1px solid ${theme.gray500};
    background: #d2d2d2;
    color: ${theme.gray500};
    border-radius: 4px;
    font-size: 14px;
  }
`;
