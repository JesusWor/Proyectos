import React from 'react'
import Button from './Button'

const GameBoard = ({ gameBoard, handleMove }) => {
  return (
    <div className="game-board">
      {gameBoard.map((cell, index) => (
        <Button
          key={index}
          index={index}
          value={cell}
          handleMove={handleMove}
        />
      ))}
    </div>
  )
}

export default GameBoard
