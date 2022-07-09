import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../assets/image/logo.png'
import ProdutoVenda from '../../assets/image/produto.png'
import ImgSacola from '../../assets/image/imgsacola.png'
import ImgLoginCadastro from '../../assets/image/imglogincadastro.png'
import ImgFavoritar from '../../assets/image/imgFavoritar.png'
import ImgFavoritarSelecionado from '../../assets/image/imgFavoritarSelecionadopng.png'
import axios from 'axios'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'

export default function TelaHome() {
  const navigate = useNavigate()
  const [userLogado, setUserLogado] = useState()
  const [produtoSelecionado, setProdutoSelecionado] = useState(false)
  const [sacola, setSacola] = useState(0)
  function usuarioLogado() {
    const body = {
      email: 'cabral@gmail.com',
      senha: '1234565'
    }

    const promise = axios.post('http://127.0.0.1:5000/login', body)
    promise
      .then(response => {
        console.log(response)
        setProdutoSelecionado(!produtoSelecionado)
      })
      .catch(error => {
        console.log(error.response.status)
        setUserLogado(error.response.status)
        return (
          <>
            {Confirm.show(
              'Vi que você não está logado',
              'Quer fazer login?',
              'Sim',
              'Não',
              () => {
                navigate('/login')
              },
              () => {}
            )}
          </>
        )
      })
  }
  // function selecionarProduto() {
  //   setSacola((sacola += 1))
  // }

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
          <Link to={''} style={{ textDecoration: 'none', color: '#301B1B' }}>
            {/* <span>{sacola}</span> */}
            <img src={ImgSacola} alt="Botão de Sacola" />
          </Link>
          <Link to={'/login'}>
            <img src={ImgLoginCadastro} alt="Botão de Login ou Cadastro" />
          </Link>
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
            <img
              src={
                produtoSelecionado === false
                  ? ImgFavoritar
                  : ImgFavoritarSelecionado
              }
              alt="icone de favoritar um produto"
              className="Favoritar"
              onClick={usuarioLogado}
            />
            <img src={ProdutoVenda} alt="Produtos mais vendidos" />
            <InformacoesProduto>
              <span>Nome do produto</span>
              <div>
                <span>R$199,90</span>
                <button onClick={usuarioLogado}>Comprar</button>
              </div>
            </InformacoesProduto>
          </MaisVendidos>
          <MaisVendidos>
            <img
              src={ImgFavoritar}
              alt="icone de favoritar um produto"
              className="Favoritar"
            />
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
              <img
                src={ImgFavoritar}
                alt="icone de favoritar um produto"
                className="Favoritar"
              />
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
              <img
                src={ImgFavoritar}
                alt="icone de favoritar um produto"
                className="Favoritar"
              />
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
              <img
                src={ImgFavoritar}
                alt="icone de favoritar um produto"
                className="Favoritar"
              />
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
              <img
                src={ImgFavoritar}
                alt="icone de favoritar um produto"
                className="Favoritar"
              />
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
    </Body>
  )
}

// CONFIGURAR O ESTILO DO POPUP
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
`
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
  box-shadow: 3px 3px 10px #888888;
  div:nth-child(1) {
    img {
      width: 80px;
      height: 86px;
    }
  }
`
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
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    margin: 0px 0.5rem;
    cursor: pointer;
    z-index: 1;
  }
  span {
    position: absolute;
    top: 29px;
    right: 80px;
  }
`
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
`
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
`
const ListaProdutos = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
  margin-top: 45px;
  h2 {
    font-weight: 700;
    font-size: 36px;
    margin-left: 5px;
  }
`
const Produtos = styled.div`
  padding-right: 5px;
  display: flex;
  gap: 20px;
  align-items: center;
  overflow-x: scroll;
`
const MaisVendidos = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 190px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.06);
  position: relative;
  .Favoritar {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 25px;
    height: 22px;
    cursor: pointer;
  }
  img {
    width: 190px;
    height: 60%;
  }
  img:hover {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.06);
  }
`
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
`
