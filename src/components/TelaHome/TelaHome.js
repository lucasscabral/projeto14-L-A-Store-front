import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../assets/image/logo.png'
import ProdutoVenda from '../../assets/image/produto.png'
import ImgSacola from '../../assets/image/imgsacola.png'
import ImgLoginCadastro from '../../assets/image/imglogincadastro.png'
import ImgFavoritar from '../../assets/image/imgFavoritar.png'
import ImgFavoritarSelecionado from '../../assets/image/imgFavoritarSelecionadopng.png'
import ImgEstrela from '../../assets/image/star.svg'
import ImgReturn from '../../assets/image/return.svg'
import ImgCostumer from '../../assets/image/costumer.svg'
import ImgLogOut from '../../assets/image/imgLogout.webp'
import axios from 'axios'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'
import { Report } from 'notiflix/build/notiflix-report-aio'
import UserContext from '../../contexts/UserContext'

function ProdutosMaisVendidos({
  nomeProduto,
  imgProduto,
  precoProduto,
  numeroProduto,
  token,
  sacola,
  setSacola
}) {
  const pedidoSelecionado = {
    numeroProduto
  }
  const [produtoSelecionado, setProdutoSelecionado] = useState(false)
  const navigate = useNavigate()

  function selecionarPedido() {
    if (token === '') {
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
    }
    if (!produtoSelecionado) {
      const promise = axios.post(
        'https://leastore.herokuapp.com/checkout',
        pedidoSelecionado,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      promise
        .then(response => {
          setSacola([...sacola, response.data])
          setProdutoSelecionado(!produtoSelecionado)
        })
        .catch(error => {})
      return
    } else {
      const desmarcarProduto = axios.put(
        `https://leastore.herokuapp.com/checkout`,
        pedidoSelecionado,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      desmarcarProduto
        .then(response => {
          setProdutoSelecionado(!produtoSelecionado)
          let desmarcaFavorito = sacola.filter(
            produto => produto.numeroProduto !== response.data.numeroProduto
          )
          setSacola([...desmarcaFavorito])
        })
        .catch(error => {
          alert(error.response.data)
        })
      return
    }
  }
  return (
    <Produto id={numeroProduto}>
      <img
        src={
          produtoSelecionado === false ? ImgFavoritar : ImgFavoritarSelecionado
        }
        alt="icone de favoritar um produto"
        className="Favoritar"
        onClick={selecionarPedido}
      />
      <img src={imgProduto} alt="Produtos mais vendidos" />
      <InformacoesProduto>
        <span>{nomeProduto}</span>
        <div>
          <span>R$ {precoProduto}</span>
          <button>Comprar</button>
        </div>
      </InformacoesProduto>
    </Produto>
  )
}
function ProdutosOutLet({
  nomeProduto,
  imgProduto,
  precoProduto,
  numeroProduto,
  token,
  sacola,
  setSacola
}) {
  const pedidoSelecionado = {
    numeroProduto
  }
  const [produtoSelecionado, setProdutoSelecionado] = useState(false)
  const navigate = useNavigate()

  function selecionarPedido() {
    if (token === '') {
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
    }
    if (!produtoSelecionado) {
      const promise = axios.post(
        'https://leastore.herokuapp.com/checkout',
        pedidoSelecionado,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      promise
        .then(response => {
          setSacola([...sacola, response.data])
          setProdutoSelecionado(!produtoSelecionado)
        })
        .catch(error => {})
      return
    } else {
      const desmarcarProduto = axios.put(
        `https://leastore.herokuapp.com/checkout`,
        pedidoSelecionado,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      desmarcarProduto
        .then(response => {
          setProdutoSelecionado(!produtoSelecionado)
          let desmarcaFavorito = sacola.filter(
            produto => produto.numeroProduto !== response.data.numeroProduto
          )
          setSacola([...desmarcaFavorito])
        })
        .catch(error => {
          alert(error.response.data)
        })
      return
    }
  }
  return (
    <Produto id={numeroProduto}>
      <img
        src={
          produtoSelecionado === false ? ImgFavoritar : ImgFavoritarSelecionado
        }
        alt="icone de favoritar um produto"
        className="Favoritar"
        onClick={selecionarPedido}
      />
      <img src={imgProduto} alt="Produtos mais vendidos" />
      <InformacoesProduto>
        <span>{nomeProduto}</span>
        <div>
          <span>R$ {precoProduto}</span>
          <button>Comprar</button>
        </div>
      </InformacoesProduto>
    </Produto>
  )
}

export default function TelaHome() {
  const { token, setToken, sacola, setSacola } = useContext(UserContext)
  const [todosProdutos, setTodosProdutos] = useState([])
  const maisVendidos = todosProdutos?.filter(
    produto => produto.tipo === 'mais_vendido'
  )
  const produtosOutlet = todosProdutos?.filter(
    produto => produto.tipo === 'outlet'
  )

  const produtosDrop = todosProdutos?.filter(produto => produto.tipo === 'drop')

  useEffect(() => {
    async function pegarProdutosComGet() {
      try {
        const pegaTodosProdutos = await axios.get(
          'https://leastore.herokuapp.com/produtos'
        )
        setTodosProdutos(pegaTodosProdutos.data)
      } catch (error) {
        alert('Não conseguimos listar os produtos')
      }
    }
    pegarProdutosComGet()
  }, [])

  return (
    <Body>
      <Header>
        <div>
          <img src={Logo} alt="logo da loja" />
        </div>
        <Nav>
          <a href="#NovosDrops">Collections</a>
          <a href="#Sobre">Sobre</a>
        </Nav>
        <Buttons>
          <Link
            to={'/checkout'}
            style={{ textDecoration: 'none', color: '#301B1B' }}
          >
            <span>{sacola.length === 0 ? '' : sacola.length}</span>
            <img src={ImgSacola} alt="Botão de Sacola" />
          </Link>
          {token === '' ? (
            <Link to={'/login'}>
              <img src={ImgLoginCadastro} alt="Botão de Login ou Cadastro" />
            </Link>
          ) : (
            <Link to={'/'}>
              <img
                src={ImgLogOut}
                alt="Botão de LogOut"
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
      <BanerOfertas>
        <ProdutoOferta>
          <img src={ProdutoVenda} alt="Produtos Especiais" />
          <h1>
            Oferta <br /> Especial
          </h1>
        </ProdutoOferta>
        <p>
          Temos diversas variedades de roupas venha conhecer nossos produtos
        </p>
        <button>
          <a href="#OutLet">Ver mais</a>
        </button>
      </BanerOfertas>
      <ListaProdutos id="MaisVendidos">
        <h2>Mais Vendidos</h2>
        <Produtos>
          {maisVendidos?.map((produto, id) => (
            <ProdutosMaisVendidos
              key={id}
              nomeProduto={produto.nome}
              precoProduto={produto.preco}
              imgProduto={produto.imgProduto}
              numeroProduto={produto.numeroProduto}
              token={token}
              sacola={sacola}
              setSacola={setSacola}
            />
          ))}
        </Produtos>
      </ListaProdutos>
      <scroll-container>
        <ListaProdutos id="OutLet">
          <h2>OutLet</h2>
          <Produtos>
            {produtosOutlet?.map((produto, id) => (
              <ProdutosOutLet
                key={id}
                nomeProduto={produto.nome}
                precoProduto={produto.preco}
                imgProduto={produto.imgProduto}
                numeroProduto={produto.numeroProduto}
                token={token}
                sacola={sacola}
                setSacola={setSacola}
              />
            ))}
          </Produtos>
        </ListaProdutos>
      </scroll-container>
      <PorqueEscolhem id="Sobre">
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
      <ListaProdutos>
        <h2 id="NovosDrops">L&A x Sufgang</h2>
        <Produtos>
          {produtosDrop.map((produto, id) => (
            <Drops key={id}>
              <Produto id={produto.numeroProduto}>
                <img src={produto.imgProduto} alt="Produtos mais vendidos" />
                <InformacoesProduto>
                  <span>{produto.nome}</span>
                  <div>
                    <span>R$ {produto.preco}</span>
                    <button disabled>Em breve</button>
                  </div>
                </InformacoesProduto>
              </Produto>
            </Drops>
          ))}
        </Produtos>
      </ListaProdutos>
      <Footer>
        <FooterContainer>
          <img height={150} width={130} src={Logo} alt="" />
          <FooterInfos>
            <h3>Catálogo</h3>
            <a href="#MaisVendidos">Mais vendidos</a>
            <a href="#OutLet">OutLet</a>
            <a href="#NovosDrops">Novos drops</a>
          </FooterInfos>
          <FooterInfos>
            <h3>Atendimento</h3>
            <p>Seg / Quin 9:00 - 20:00 </p>
            <p>Sex 9:00 - 19:00</p>
            <p>Sab 9:00 - 17:00</p>
          </FooterInfos>
        </FooterContainer>

        <Copyright>
          <p>© 2022 L&A. All rights reserved.</p>
        </Copyright>
      </Footer>
    </Body>
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

const Body = styled.main`
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
  z-index: 2;
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

  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    margin: 0 15px;
    color: #000;
    cursor: pointer;
  }
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
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
const ProdutoOferta = styled.div`
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

const Produto = styled.div`
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
    border-radius: 8px;
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
`

const Vantagens = styled.div`
  display: flex;
  align-items: center;
`

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
`

const Drops = styled.div`
  margin-top: 20px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 190px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.06);
  position: relative;

  img {
    width: 190px;
    height: 60%;
    border-radius: 8px;
  }
  img:hover {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.06);
  }
`

const Footer = styled.footer`
  background-color: #ede8e7;
  height: 290px;
`

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0px 0 0px;
  gap: 20px;
`

const FooterInfos = styled.section`
  margin-right: 25px;
  margin-top: 30px;
  h3 {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 500;
    color: #311c1c;
    line-height: 18px;
  }
  a {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    color: #311c1c;
    line-height: 20px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: #311c1c;
    line-height: 20px;
  }
`

const Copyright = styled.div`
  margin-top: 40px;
  border-top: 1px solid;
  padding-top: 10px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #b5abaa;
`
