import styled from "styled-components";
import { useEffect, useState } from "react";
import Logo from "../../assets/image/logo.png";
import ProdutoVenda from "../../assets/image/produto.png";
import ImgSacola from "../../assets/image/imgsacola.png";
import ImgLoginCadastro from "../../assets/image/imglogincadastro.png";
import ImgEstrela from "../../assets/image/star.svg";
import ImgReturn from "../../assets/image/return.svg";
import ImgCostumer from "../../assets/image/costumer.svg";

export default function TelaHome() {
  return (
    <Body>
      <Header>
        <div>
          <img src={Logo} alt="logo da loja" />
        </div>
        <Nav>
          <h3>Collections</h3>
          <h3>Sobre</h3>
        </Nav>
        <Buttons>
          <img src={ImgSacola} alt="Botão de Sacola" />
          <img src={ImgLoginCadastro} alt="Botão de Login ou Cadastro" />
        </Buttons>
      </Header>
      <BanerOfertas>
        <Produto>
          <img src={ProdutoVenda} alt="Produtos Especiais" />
          <h1>
            Oferta <br /> Especial
          </h1>
        </Produto>
        <p>
          Temos diversar variedades de alguma coisa venha conhecer nosos
          produtos
        </p>
        <button>
          <a href="#OutLet">Ver mais</a>
        </button>
      </BanerOfertas>
      <ListaProdutos>
        <h2>Mais Vendidos</h2>
        <Produtos>
          <MaisVendidos>
            <img src={ProdutoVenda} alt="Produtos mais vendidos" />
            <InformacoesProduto>
              <span>Nome do produto</span>
              <div>
                <span>R$199,90</span>
                <button>Comprar</button>
              </div>
            </InformacoesProduto>
          </MaisVendidos>
          <MaisVendidos>
            <img src={ProdutoVenda} alt="Produtos mais vendidos" />
            <InformacoesProduto>
              <span>Nome do produto</span>
              <div>
                <span>R$199,90</span>
                <button>Comprar</button>
              </div>
            </InformacoesProduto>
          </MaisVendidos>
        </Produtos>
      </ListaProdutos>
      <scroll-container>
        <ListaProdutos id="OutLet">
          <h2>OutLet</h2>
          <Produtos>
            <MaisVendidos>
              <img src={ProdutoVenda} alt="Produtos mais vendidos" />
              <InformacoesProduto>
                <span>Nome do produto</span>
                <div>
                  <span>R$199,90</span>
                  <button>Comprar</button>
                </div>
              </InformacoesProduto>
            </MaisVendidos>
            <MaisVendidos>
              <img src={ProdutoVenda} alt="Produtos mais vendidos" />
              <InformacoesProduto>
                <span>Nome do produto</span>
                <div>
                  <span>R$199,90</span>
                  <button>Comprar</button>
                </div>
              </InformacoesProduto>
            </MaisVendidos>
          </Produtos>
        </ListaProdutos>
      </scroll-container>
      <PorqueEscolhem>
        <h2>
          Porque as pessoas <br /> escolhem a gente
        </h2>
        <Vantagens>
          <Vantagem>
            <img src={ImgEstrela} alt="" />
            <h3>Alta qualidade</h3>
            <p>
              Todos os nossos produtos passam por uma inspeção muito rigorosa
              antes de despachá-los
            </p>
          </Vantagem>
          <Vantagem>
            <img src={ImgReturn} alt="" />
            <h3>Retorno fácil</h3>
            <p>
              Nossa política de devolução é simples e é por isso que os clientes
              adoram nossa loja
            </p>
          </Vantagem>
        </Vantagens>
        <Vantagem>
          <img src={ImgCostumer} alt="" />
          <h3>Atendimento ao Cliente</h3>
          <p>
            Oferecemos um atendimento ao cliente incrível, não importa o que
            aconteça
          </p>
        </Vantagem>
      </PorqueEscolhem>
    </Body>
  );
}

const Body = styled.body`
  //width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scroll-container {
    overflow: scroll;
    scroll-behavior: smooth;
  }
`;
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ede8e7;
  div:nth-child(1) {
    img {
      width: 80px;
      height: 86px;
    }
  }
`;
const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h3 {
    font-weight: 500;
    font-size: 18px;
    margin: 0 15px;
    cursor: pointer;
  }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    margin: 0px 0.5rem;
    cursor: pointer;
  }
`;
const BanerOfertas = styled.div`
  margin-top: 95px;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #ede8e7;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 15px;
    width: 100%;
    flex-wrap: wrap;
    text-align: center;
    font-size: 17px;
  }
  button {
    width: 80px;
    height: 40px;
    background-color: #b5abaa;
    border: none #b5abaa;
    border-radius: 5px;
    cursor: pointer;
    margin: 15px 0;

    a {
      text-decoration: none;
      color: #ffffff;
      font-size: 15px;
    }
  }
`;
const Produto = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 140px;
  }
  h1 {
    font-weight: 600;
    font-size: 45px;
    text-align: center;
  }
`;
const ListaProdutos = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
  margin-top: 45px;
  h2 {
    font-weight: 700;
    font-size: 36px;
    margin-left: 5px;
  }
`;
const Produtos = styled.div`
  padding-right: 5px;
  display: flex;
  gap: 20px;
  align-items: center;
  overflow-x: scroll;
`;
const MaisVendidos = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 190px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.06);
  img {
    width: 190px;
    height: 60%;
    cursor: pointer;
  }
  img:hover {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.06);
  }
`;
const InformacoesProduto = styled.div`
  height: 40%;
  width: 100%;
  background: rgba(162, 158, 158, 0.49);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: #ffffff;
  }
  div {
    padding-top: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      color: #ffffff;
    }
    button {
      background-color: #ffffff;
      color: #c9c9c9;
      border: none #ffffff;
      height: 25px;
      cursor: pointer;
      border-radius: 5px;
    }
  }
`;

const PorqueEscolhem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ede8e7;
  margin-top: 45px;
  height: 500px;

  h2 {
    font-size: 25px;
    font-weight: 700;
    line-height: 31px;

    color: #311c1c;

    margin-top: 45px;
    margin-bottom: 20px;
  }
`;

const Vantagens = styled.div`
  display: flex;
  align-items: center;
`;

const Vantagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 217px;
  margin-top: 20px;

  img {
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 500;
    color: #311c1c;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #311c1c;
  }
`;
