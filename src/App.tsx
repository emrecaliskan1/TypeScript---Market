import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouterConfig from './config/RouterConfig'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from './components/Spinner'

function App() {

  return (
   <div>
      <RouterConfig/>
      <ToastContainer autoClose={2500} style={{fontSize:'12px'}}/>
      <Spinner></Spinner>
   </div>
  )
}

export default App
