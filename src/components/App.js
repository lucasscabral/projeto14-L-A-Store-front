import UserContext from './UseContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../assets/style/GlobalStyle'


export default function App() {

  return (
    <>
      <GlobalStyle />
      
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    
    </>
  )
}
