import { Container, Form, Button } from '../GlobalComponents'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../assets/image/logo.svg'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

export default function Cadastro() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [senhaIncorreta, setSenhaIncorreta] = useState(false)
  const [emailInvalido, setEmailInvalido] = useState(false)
  const [loader, setLoader] = useState('Cadastrar')
  const [disable, setDisable] = useState(false)

  const cadastrar = e => {
    e.preventDefault()
    if (senha !== confirmaSenha) {
      setSenhaIncorreta(true)
    } else {
      setSenhaIncorreta(false)
      const body = {
        nome,
        email,
        senha
      }
      console.log(body)

      const promise = axios.post(
        'https://leastore.herokuapp.com/cadastro',
        body
      )

      promise
        .then(res => {
          setDisable(true)
          setLoader(<ThreeDots color="white" />)
          setTimeout(() => navigate('/login'), 1000)
        })
        .catch(err => {
          setLoader(<ThreeDots color="white" />)
          setDisable(true)
          setTimeout(() => setDisable(false), 500)
          setTimeout(() => setLoader('Cadastrar'), 500)

          if (err.response.status) {
            setEmailInvalido(true)
          }
        })
    }
  }

  return (
    <Container>
      <TelaCadastro>
        <img width={160} height={160} src={logo} alt="" />

        <Form onSubmit={cadastrar}>
          <Input
            disabled={disable}
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />

          {emailInvalido && (
            <p className="formInvalido">
              ⛔ Use um e-mail diferente para continuar!
            </p>
          )}
          <Input
            disabled={disable}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            disabled={disable}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => {
              setSenha(e.target.value)
            }}
            required
          />

          {senhaIncorreta && (
            <p className="formInvalido"> ⛔ Senhas não coincidem!</p>
          )}

          <Input
            disabled={disable}
            type="password"
            placeholder="Confirme a senha"
            value={confirmaSenha}
            onChange={e => setConfirmaSenha(e.target.value)}
            required
          />

          <Button type="submit">{loader}</Button>
        </Form>
        <Link to={'/login'}>
          <p className="vaiParaLogin">Já tem uma conta? Entre agora!</p>
        </Link>
      </TelaCadastro>
    </Container>
  )
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

  .formInvalido {
    cursor: default;
    display: flex;

    font-size: 16px;

    margin-bottom: 3px;
    color: #311c1c;
  }

  a {
    text-decoration: none;
  }
`

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
`
