import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import logo from "../../assets/image/logo.svg";
import ImgSacola from "../../assets/image/imgsacola.png";
import ImgLoginCadastro from "../../assets/image/imglogincadastro.png";
import logout from "../../assets/image/logout.svg";
import excluir from "../../assets/image/excluir.svg";
import { Form } from "../GlobalComponents";

export default function Checkout() {
  const { sacola } = useContext(UserContext);
  const { token } = useContext(UserContext);

  const [todosProdutos, setTodosProdutos] = useState();

  console.log(todosProdutos);
  useEffect(() => {
    async function pegarProdutos() {
      try {
        const produtos = await axios.get("http://127.0.0.1:5000/checkout");
        setTodosProdutos(produtos.data);
      } catch (error) {}
    }
    pegarProdutos();
  }, []);
  // return todosProdutos?.map(() => <div>{todosProdutos.nome}</div>);
  return (
    <>
      <Header>
        <Nav>
          <Link to={"/"}>Home</Link>
        </Nav>

        <img width={80} height={86} src={logo} alt="logo da loja" />

        <Buttons>
          {token === "" ? (
            <Link to={"/login"}>
              <img src={ImgLoginCadastro} alt="Botão de Login ou Cadastro" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <img
                width={28}
                height={28}
                src={logout}
                alt="Botão de Login ou Cadastro"
              />
            </Link>
          )}
        </Buttons>
      </Header>
      <ListaPedidos>
        <ResumoPedido>
          <h2>Resumo do pedido</h2>
          <h3>Total: R$ 299,90</h3>
        </ResumoPedido>

        <Pedido>
          <InfoPedido>
            <img width={100} height={100} src={logo} alt="" />
            <h3>Sapato nike</h3>
            <h2>R$ 299.90</h2>
            <img style={{ cursor: "pointer" }} src={excluir} alt="" />
          </InfoPedido>
        </Pedido>
      </ListaPedidos>

      <ConfirmaPedido>
        <button>Continue</button>
      </ConfirmaPedido>
      <Pagamento>
        <h1> Pagamento</h1>
        <Form>
          <label htmlFor="NumeroCartao">Numero do cartão</label>
          <Input id="NumeroCartao" type="text" placeholder="Numero do cartão" />

          <label htmlFor="NomeImpresso">Nome impresso</label>
          <Input id="NomeImpresso" type="text" placeholder="Nome impresso" />

          <label htmlFor="CVV">CVV</label>
          <Input id="CVV" type="text" placeholder="CVV" />

          <label htmlFor="endereco">Endereço</label>
          <Input id="endereco" type="text" placeholder="Endereço" />

          <button type="submit">Confirmar</button>
        </Form>
      </Pagamento>
    </>
  );
}

const Pagamento = styled.div`
  border: 1px solid #b7bac0;
  padding: 5px 10px;
  margin-top: 20px;

  h1 {
    font-size: 25px;
    font-weight: 700;
    margin: 10px 0;
  }

  label {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #b5abaa;
    font-size: 15px;
    height: 50px;
    width: 100%;
  }
`;
const Input = styled.input`
  width: 326px;
  height: 58px;

  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  color: #000000;
  padding-left: 10px;
  background-color: rgba(21, 21, 21, 10%);
  border: none;

  &::placeholder {
    opacity: 1;
    color: #b5abaa;
    font-size: 16px;
    font-weight: 700;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px 40px;
  box-shadow: 3px 3px 10px #888888;
  z-index: 2;
`;

const ResumoPedido = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    color: #000;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ListaPedidos = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 150px;
  h2 {
    font-weight: 700;
    font-size: 25px;
    margin-left: 5px;
  }
`;

const Pedido = styled.div`
  border: 1px solid #b7bac0;
  padding: 5px 10px;
  margin-top: 20px;
`;

const InfoPedido = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  h2 {
    font-size: 18px;
  }
`;

const ConfirmaPedido = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #b5abaa;
    font-size: 15px;
    height: 50px;
    width: 100px;
  }
`;
