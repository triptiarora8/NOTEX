import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import Home from './assets/components/Home'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Home/>
    </>
  )
}

export default App
