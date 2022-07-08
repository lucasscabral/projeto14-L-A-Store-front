import { Container, Form, Button } from "../GlobalComponents";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/image/logo.svg";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loader, setLoader] = useState("Entrar");
  const [disable, setDisable] = useState(false);
  const [contaIncorreta, setContaIncorreta] = useState(false);

  const logar = (e) => {
    e.preventDefault();
    const body = {
      email,
      senha,
    };

    const promise = axios.post("http://localhost:5000/login", body);

    promise
      .then((res) => {
        setToken(res.data.token);
        setDisable(true);
        setLoader(<ThreeDots color="white" />);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoader(<ThreeDots color="white" />);
        setDisable(true);
        setTimeout(() => setDisable(false), 500);
        setTimeout(() => setLoader("Entrar"), 500);

        if (err.response.data) {
          setContaIncorreta(true);
        }
      });
  };

  return (
    <Container>
      <TelaLogin>
        <img width={160} height={160} src={logo} alt="" />

        <Form onSubmit={logar}>
          {contaIncorreta && (
            <p className="formInvalido">⛔ E-mail ou senha incorretos!</p>
          )}
          <Input
            disabled={disable}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Button type="submit">{loader}</Button>
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

  .formInvalido {
    cursor: default;
    display: flex;

    font-size: 16px;

    margin-bottom: 5px;
    color: #311c1c;
  }

  a {
    text-decoration: none;
  }
`;

const Input = styled.input`
  width: 326px;
  height: 58px;

  border-radius: 10px;
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
