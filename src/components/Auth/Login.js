import { Container, Form, Button } from "../GlobalComponents";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/image/logo.svg";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <TelaLogin>
        <img width={160} height={160} src={logo} alt="" />

        <Form>
          <Input type="email" placeholder="E-mail" />
          <Input type="senha" placeholder="Senha" />

          <Button type="submit">Entrar</Button>
        </Form>
        <Link to={"/cadastro"}>
          <p className="vaiParaCadastro">Primeira vez? Cadastre-se!</p>
        </Link>
      </TelaLogin>
    </Container>
  );
}

const TelaLogin = styled.div`
  margin-top: 140px;

  img {
    display: flex;
    margin: 0 auto;
    margin-bottom: 2.4rem;
  }

  .vaiParaCadastro {
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
  margin-bottom: 15px;
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
