import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../assets/style/GlobalStyle.js'
import TelaHome from './TelaHome/TelaHome.js'
import Login from './Auth/Login'
import Cadastro from './Auth/Cadastro'
import Checkout from './TelaCheckout/Checkout'
import UserContext from '../contexts/UserContext.js'
import { useState } from 'react'

export default function App() {
  const [token, setToken] = useState('')
  const [sacola, setSacola] = useState([])
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ token, setToken, sacola, setSacola }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}
