import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/pages/Layout';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home1 from './components/pages/Home1';
import Contact from './components/pages/Contact';
import LoginReg from './components/pages/auth/LoginReg';
import SendPasswordResetEmail from './components/pages/auth/SendPasswordResetEmail';
import ResetPassword from './components/pages/auth/ResetPassword';
import Dashboard from './components/pages/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const {access_token} = useSelector(state =>state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
          <Route index element = {<Home1/>} />
          <Route path = 'contact' element = {<Contact/>} />
          <Route path = 'login' element = {!access_token ? <LoginReg/> : <Navigate to='/dashboard' />} />
          <Route path = 'sendpasswordresetemail' element = {<ResetPassword/>} />
          <Route path = 'api/user/reset/:id/:token' element = {<SendPasswordResetEmail/>} />
          </Route>
          <Route path = '/dashboard' element = {access_token ? <Dashboard/> : <Navigate to='/login' />} />
          <Route path = '*' element = {<h1>Error 404 PAge not Found</h1>} />
        </Routes>
  
      </BrowserRouter>
    </>
  );
}

export default App;
