import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GameBoard from './GameBoard'
import { useNavigate } from 'react-router-dom'

const GameLogic = () => {
  const navigate = useNavigate()
  const [gameBoard, setGameBoard] = useState(Array(9).fill(' '))
  const [currentPlayer, setCurrentPlayer] = useState('🐐')
  const [gameActive, setGameActive] = useState(true)

  const handleMove = (position) => {
    if (!gameActive) return

    const newBoard = [...gameBoard]
    if (newBoard[position] === ' ') {
      newBoard[position] = currentPlayer
      setGameBoard(newBoard)

      if (checkWin(newBoard)) {
        toast.success(`¡El jugador ${currentPlayer} ha ganado! 🎉`, {
          position: 'top-center',
          autoClose: 3000,
        })
        setGameActive(false)
        return
      }

      if (newBoard.every((cell) => cell !== ' ')) {
        toast.info('¡El juego ha quedado en empate! 🤝', {
          position: 'top-center',
          autoClose: 3000,
        })
        setGameActive(false)
        return
      }

      setCurrentPlayer(currentPlayer === '🐐' ? '🍇' : '🐐')
    } else {
      toast.warning('Esta casilla ya fue tomada 😅', {
        position: 'top-center',
        autoClose: 2000,
      })
    }
  }

  const checkWin = (board) => {
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    return conditions.some(
      ([a, b, c]) =>
        board[a] === currentPlayer &&
        board[b] === currentPlayer &&
        board[c] === currentPlayer
    )
  }

  const resetGame = () => {
    setGameBoard(Array(9).fill(' '))
    setCurrentPlayer('🐐')
    setGameActive(true)
    toast.info('¡El juego ha sido reiniciado! 🕹️', {
      position: 'bottom-right',
      autoClose: 2000,
    })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="game-container">
      <h1>¡Bienvenido al Juego!</h1>
      <GameBoard gameBoard={gameBoard} handleMove={handleMove} />
      <div className="current-player">Jugador actual: {currentPlayer}</div>
      <button className="reset-button" onClick={resetGame}>
        Reiniciar Juego
      </button>
      <button className="reset-button" onClick={handleBack}>
        Regresar
      </button>
      <ToastContainer />
      <footer>
        <p>Desarrollado con ❤️ por Jesús Eduardo</p>
      </footer>
    </div>
  )
}

export default GameLogic
