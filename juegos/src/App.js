import React from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/menu'
import GameLogic from './components/logicaTicTac'
import GameFlappyBird from './components/GameFalppyBird'
import GameWordle from './components/WordleGame'
import GameConecta4 from './components/Conecta4Game'
import GameSnake from './components/SnakeGame'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta del menú */}
        <Route path="/" element={<Menu />} />
        {/* Ruta de los juegos */}
        <Route path="/TicTacToe" element={<GameLogic />} />
        <Route path="/FlappyBird" element={<GameFlappyBird />} />
        <Route path="/Wordle" element={<GameWordle />} />
        <Route path="/Conecta4" element={<GameConecta4 />} />
        <Route path='/Snake' element={<GameSnake />} />
      </Routes>
    </Router>
  )
}

export default App