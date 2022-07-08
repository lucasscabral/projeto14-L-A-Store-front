import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../assets/style/GlobalStyle.js'
import TelaHome from './TelaHome/TelaHome.js'
import Login from "./Auth/Login";
import Cadastro from "./Auth/Cadastro";
import UserContext from '../contexts/UserContext.js'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaHome />} />
            <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
