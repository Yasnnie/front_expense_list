import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";
import Expense from "../Expense";
import Plus from "../../assets/icons/add.svg";

import ModalCreateExpense, { ModalMethodsCreate } from "../ModalCreateExpense";
import { ExpenseType } from "../../types";
import { getAllExpenses } from "../../service";

export default function List() {
  const modalRef = useRef<ModalMethodsCreate>(null);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useEffect(()=>{
    getAllExpenses().then( res => setExpenses(res))
  },[])

  function createExpense(item: ExpenseType) {
    setExpenses([item, ...expenses]);
  }

  function editExpense(item: ExpenseType) {
    let new_list = [...expenses]
    const index = new_list.findIndex((i)=> i.id == item.id)

    new_list[index] = item
    setExpenses([...new_list])
  }

  function onDelete(id:number){
    const new_list = expenses.filter((item)=> item.id != id)
    setExpenses(new_list)
  }

  

  return (
    <Container>
      <ModalCreateExpense ref={modalRef} editExpense={editExpense} createExpensive={createExpense} />
      <main className="c-main">
        <button
          className="c-main__button"
          onClick={() => modalRef.current?.openModal()}
        >
          <img src={Plus} alt="Adicionar" />
          Criar Despesa
        </button>

        <ul className="c-main__c-list">
          {expenses.map((item) => (
            <Expense key={item.id} expense={item} onDelete={onDelete} edit={()=>{
              modalRef.current?.openModal(item)
            }}/>
          ))}
        </ul>
      </main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 56px 24px;

  .c-main {
    width: 100%;
    max-width: 1080px;

    .c-main__button {
      background: ${theme.primaryPurple};
      padding: 12px 16px 12px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      color: ${theme.white};
      display: flex;
      align-items: center;
      gap: 4px;

      img {
        width: 24px;
        height: 24px;
      }
    }

    .c-main__c-list {
      margin-top: 32px;
      list-style: none;
    }
  }
`;
