import React from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";
import Coin from "../../assets/icons/coin.svg";

export default function Header() {
  return (
    <Container>
      <header className="c-header">
        <h1 className="c-header__title">
            <img src={Coin} alt="logo"/>
            Lista de Despesas
            </h1>
        <p className="c-header__author">Author: Yasmin Carvalho</p>
      </header>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: ${theme.primaryPurple};
  display: flex;
  align-items: center;
  justify-content: center;
  height:64px;

  .c-header{
    width: 100%;
    max-width: 1080px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.white};

    .c-header__title{
        font-size: 28px;
        display: flex;
        align-items: center;
        gap: 8px;

        img{
            width: 32px;
            height: 32px;
        }
    }

    .c-header__author{
        font-size: 16px;
    }
  }
`;
