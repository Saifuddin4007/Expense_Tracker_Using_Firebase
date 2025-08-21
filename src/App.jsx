import React from 'react'
import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Report from './pages/Report'
import Transaction from './pages/Transaction'
import NavBar from './components/NavBar'
import AddTransaction from './pages/AddTransaction'
import Authentication from './pages/auth/Authentication'
import EmailAuth from './pages/auth/EmailAuth'

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavOn = ['/']; // You can add more routes here where NavBar should be hidden
  return (
    <>
      {!hideNavOn.includes(location.pathname) && <NavBar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
      {/* <NavBar /> */}
      <Layout>
        <Routes>
          <Route path='/' element={<Authentication />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/report' element={<Report />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/add-transaction' element={<AddTransaction />} />
          <Route path='/email-auth' element={<EmailAuth />} />
        </Routes>
      </Layout>
      </BrowserRouter>
      
    </>
  )
}

export default App