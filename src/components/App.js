import UserContext from './UseContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../estilos/reset.css'
import '../estilos/fontes.css'

export default function App() {

  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
