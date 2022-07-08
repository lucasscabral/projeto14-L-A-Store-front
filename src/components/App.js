import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../assets/style/GlobalStyle.js'
import TelaHome from './TelaHome/TelaHome.js'
import UserContext from '../contexts/UserContext.js'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaHome />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}
