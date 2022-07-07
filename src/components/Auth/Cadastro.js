import { Container, Form, Button } from "../GlobalComponents";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/image/logo.svg";
import styled from "styled-components";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <Container>
      <TelaCadastro>
        <img width={160} height={160} src={logo} alt="" />

        <Form>
          <Input type="text" placeholder="Nome" />
          <Input type="email" placeholder="E-mail" />
          <Input type="password" placeholder="Senha" />
          <Input type="password" placeholder="Confirme a senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to={"/login"}>
          <p className="vaiParaLogin">Já tem uma conta? Entre agora!</p>
        </Link>
      </TelaCadastro>
    </Container>
  );
}

const TelaCadastro = styled.div`
  margin-top: 140px;

  img {
    display: flex;
    margin: 0 auto;
    margin-bottom: 2.4rem;
  }

  .vaiParaLogin {
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    color: #311c1c;
    font-size: 18px;

    font-weight: 400;
  }

  a {
    text-decoration: none;
  }
`;

const Input = styled.input`
  width: 326px;
  height: 58px;

  border-radius: 50px;
  margin-bottom: 10px;
  font-size: 17px;
  color: #000000;
  padding-left: 50px;
  background-color: rgba(21, 21, 21, 10%);
  border: none;

  &::placeholder {
    opacity: 1;
    color: #311c1c;
    font-size: 20px;
    font-weight: 700;
  }
`;
