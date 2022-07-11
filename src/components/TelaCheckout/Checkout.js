import styled from 'styled-components'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../contexts/UserContext'
import logo from '../../assets/image/logo.svg'
import ImgLoginCadastro from '../../assets/image/imglogincadastro.png'
import logout from '../../assets/image/logout.svg'
import excluir from '../../assets/image/excluir.svg'
import { Form } from '../GlobalComponents'
import { Notify } from 'notiflix'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import { Report } from 'notiflix/build/notiflix-report-aio'

function Pedidos({
  imgProduto,
  preco,
  nome,
  numeroProduto,
  sacola,
  setSacola,
  token
}) {
  function excluirProduto() {
    Confirm.show(
      'Confirmar remoção do produto',
      'Você quer remover esse produto da sua sacola?',
      'Sim',
      'Não',
      () => {
        const pedidoSelecionado = {
          numeroProduto
        }
        const retirarProdutoSacola = axios.put(
          `http://127.0.0.1:5000/checkout`,
          pedidoSelecionado,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        retirarProdutoSacola
          .then(response => {
            let retirarProduto = sacola.filter(
              produto => produto.numeroProduto !== response.data.numeroProduto
            )
            setSacola([...retirarProduto])
          })
          .catch(error => {
            alert(error.response.data)
          })
      },
      () => {}
    )
  }
  return (
    <Pedido id={numeroProduto}>
      <InfoPedido>
        <img width={100} height={100} src={imgProduto} alt="" />
        <h3>{nome}</h3>
        <h2>R$ {preco}</h2>
        <img
          style={{ cursor: 'pointer' }}
          src={excluir}
          alt=""
          onClick={excluirProduto}
        />
      </InfoPedido>
    </Pedido>
  )
}

export default function Checkout() {
  const { sacola, setSacola, token, setToken } = useContext(UserContext)
  const [dadosPagamento, setDadosPagamento] = useState(false)
  const [numeroCartao, setNumeroCartao] = useState('')
  const [ccv, setCcv] = useState('')
  const navigate = useNavigate()
  let totalPedido = 0
  sacola?.map(produtos => (totalPedido += parseFloat(produtos.preco)))

  function dadosDoPagamento(e) {
    e.preventDefault()
    setDadosPagamento(true)
  }

  function pagamento(e) {
    e.preventDefault()
    Notify.success('Pagamento efetuado!')
    setSacola([])
    navigate('/')
  }
  return (
    <>
      <Header>
        <Nav>
          <Link to={'/'}>Home</Link>
        </Nav>

        <img width={80} height={86} src={logo} alt="logo da loja" />

        <Buttons>
          {token === '' ? (
            <Link to={'/login'}>
              <img src={ImgLoginCadastro} alt="Botão de Login ou Cadastro" />
            </Link>
          ) : (
            <Link to={'/'}>
              <img
                width={28}
                height={28}
                src={logout}
                alt="Botão de Logout"
                onClick={() => {
                  Report.success(
                    'Saída com sucesso',
                    'Obrigado Por Visitar nosso site! volte sempre',
                    'Okay'
                  )
                  setToken('')
                  setSacola([])
                }}
              />
            </Link>
          )}
        </Buttons>
      </Header>
      <ListaPedidos>
        <ResumoPedido>
          <h2>Resumo do pedido</h2>
          <h3>Total: R$ {totalPedido.toFixed(2)}</h3>
        </ResumoPedido>
        {sacola?.map((pedidos, id) => (
          <Pedidos
            key={id}
            imgProduto={pedidos.imgProduto}
            preco={pedidos.preco}
            nome={pedidos.nome}
            numeroProduto={pedidos.numeroProduto}
            sacola={sacola}
            setSacola={setSacola}
            token={token}
          />
        ))}
      </ListaPedidos>

      <ConfirmaPedido>
        <button onClick={dadosDoPagamento}>Continue</button>
      </ConfirmaPedido>
      <Pagamento pagamento={dadosPagamento}>
        <h1> Pagamento</h1>
        <Form onSubmit={pagamento}>
          <label htmlFor="NumeroCartao">Numero do cartão</label>
          <Input
            id="NumeroCartao"
            type="text"
            placeholder="Numero do cartão"
            required
            value={numeroCartao}
            onChange={e => {
              if (Number(e.target.value) || e.target.value === '') {
                setNumeroCartao(e.target.value)
              }
            }}
          />

          <label htmlFor="NomeImpresso">Nome impresso</label>
          <Input
            id="NomeImpresso"
            type="text"
            placeholder="Nome impresso"
            required
          />

          <label htmlFor="CVV">CVV</label>
          <Input
            id="CVV"
            type="text"
            placeholder="CVV"
            required
            value={ccv}
            onChange={e => {
              if (
                (e.target.value.length < 4 && Number(e.target.value)) ||
                e.target.value === ''
              ) {
                setCcv(e.target.value)
              }
            }}
          />

          <label htmlFor="endereco">Endereço</label>
          <Input id="endereco" type="text" placeholder="Endereço" required />

          <button type="submit">Confirmar</button>
        </Form>
      </Pagamento>
    </>
  )
}

// CONFIG DO POPUP DE SAIR DO SITE
Report.init({
  className: 'notiflix-report',
  width: '320px',
  backgroundColor: '#f8f8f8',
  borderRadius: '25px',
  rtl: false,
  zindex: 4002,
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  backOverlayClickToClose: false,
  fontFamily: 'Quicksand',
  svgSize: '110px',
  plainText: true,
  titleFontSize: '16px',
  titleMaxLength: 34,
  messageFontSize: '13px',
  messageMaxLength: 400,
  buttonFontSize: '14px',
  buttonMaxLength: 34,
  cssAnimation: true,
  cssAnimationDuration: 360,
  cssAnimationStyle: 'fade',
  success: {
    svgColor: '#301B1B',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#301B1B',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(49, 28, 28,0.2)'
  }
})

Confirm.init({
  className: 'notiflix-confirm',
  width: '300px',
  zindex: 4003,
  position: 'center',
  distance: '10px',
  backgroundColor: '#f8f8f8',
  borderRadius: '25px',
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  rtl: false,
  fontFamily: 'Quicksand',
  cssAnimation: true,
  cssAnimationDuration: 300,
  cssAnimationStyle: 'fade',
  plainText: true,
  titleColor: '#301B1B',
  titleFontSize: '16px',
  titleMaxLength: 34,
  messageColor: '#1e1e1e',
  messageFontSize: '14px',
  messageMaxLength: 110,
  buttonsFontSize: '15px',
  buttonsMaxLength: 34,
  okButtonColor: '#f8f8f8',
  okButtonBackground: '#301B1B',
  cancelButtonColor: '#f8f8f8',
  cancelButtonBackground: '#a9a9a9'
})

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
`

const ResumoPedido = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

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
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const ListaPedidos = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 150px;
  h2 {
    font-weight: 700;
    font-size: 25px;
    margin-left: 5px;
  }
`

const Pedido = styled.div`
  border: 1px solid #b7bac0;
  padding: 5px 10px;
  margin-top: 20px;
`

const InfoPedido = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  h2 {
    font-size: 18px;
  }
`

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
`

const Pagamento = styled.div`
  display: ${({ pagamento }) => (pagamento ? 'inital' : 'none')};
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
    margin-bottom: 20px;
  }
`
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
`
