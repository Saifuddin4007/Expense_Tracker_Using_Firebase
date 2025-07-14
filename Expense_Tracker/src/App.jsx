import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Report from './pages/Report'
import Transaction from './pages/Transaction'
import NavBar from './components/NavBar'
import AddTransaction from './pages/AddTransaction'


const App = () => {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='/report' element={<Report />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/add-transaction' element={<AddTransaction />} />
        </Routes>
      
      </BrowserRouter>
      
    </>
  )
}

export default App