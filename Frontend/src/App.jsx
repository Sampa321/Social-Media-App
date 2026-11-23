import React from 'react'
import {Routes , Route} from "react-router-dom"
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Logout from './Pages/Logout.jsx'
import Signup from './Pages/Signup.jsx'
import Header from '../Components/Header.jsx'


export default function App() {
  return (
    <div> 
        <Header/>
      <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/logout' element={<Logout/>}/>
           <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}