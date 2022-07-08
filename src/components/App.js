import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/style/GlobalStyle.js";
import TelaHome from "./TelaHome/TelaHome.js";
import Login from "./Auth/Login";
import Cadastro from "./Auth/Cadastro";
import UserContext from "../contexts/UserContext.js";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState("");
  console.log(token);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ token, setToken }}>
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
