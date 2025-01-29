import React from 'react'
import GameLogic from './components/logicaTicTac' // Ruta correcta al archivo
import './styles/App.css'
import './styles/estiloTicTac.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/menu'
import GameFlappyBird from './components/GameFalppyBird'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta del menú */}
        <Route path="/" element={<Menu />} />
        {/* Ruta del juego */}
        <Route path="/TicTacToe" element={<GameLogic />} />
        <Route path="/FlappyBird" element={<GameFlappyBird />} />
      </Routes>
    </Router>
  )
}

export default App
