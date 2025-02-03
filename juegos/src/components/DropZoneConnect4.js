import React, { useEffect, useState } from 'react'
import { size, rows, cols } from '../constant/constant'
import ActiveCoin from './ActiveCoinConnect4'
import Winner from './WinnerConnect4'

const DropZone = () => {
  const [turn, setTurn] = useState(1)
  const [winner, setWinner] = useState(0)
  const [dropped, setDropped] = useState([])

  const checkWinner = (player) => {
    const playerDrops = dropped.filter((d) => d.player === player)
    for (let { x, y } of playerDrops) {
      // Horizontal
      if (
        playerDrops.find((m) => x === m.x + 1 && y === m.y) &&
        playerDrops.find((m) => x === m.x + 2 && y === m.y) &&
        playerDrops.find((m) => x === m.x + 3 && y === m.y)
      )
        return player

      // Vertical
      if (
        playerDrops.find((m) => x === m.x && y === m.y + 1) &&
        playerDrops.find((m) => x === m.x && y === m.y + 2) &&
        playerDrops.find((m) => x === m.x && y === m.y + 3)
      )
        return player

      // Diagonal descendente
      if (
        playerDrops.find((m) => x === m.x + 1 && y === m.y + 1) &&
        playerDrops.find((m) => x === m.x + 2 && y === m.y + 2) &&
        playerDrops.find((m) => x === m.x + 3 && y === m.y + 3)
      )
        return player

      // Diagonal ascendente
      if (
        playerDrops.find((m) => x === m.x + 1 && y === m.y - 1) &&
        playerDrops.find((m) => x === m.x + 2 && y === m.y - 2) &&
        playerDrops.find((m) => x === m.x + 3 && y === m.y - 3)
      )
        return player
    }
    return 0
  }

  const reset = () => {
    setTurn(1)
    setDropped([])
    setWinner(0)
  }

  useEffect(() => {
    try {
      const winner1 = checkWinner(1)
      const winner2 = checkWinner(2)

      if (winner1) {
        setWinner(1)
      } else if (winner2) {
        setWinner(2)
      } else if (dropped.length >= rows * cols) {
        setWinner(-1) // Draw condition
      }
    } catch (error) {
      console.error('Error while checking for a winner:', error)
    }
  }, [dropped])

  useEffect(() => console.log(winner), [winner])

  return (
    <div className="conecta4-drop-zone">
      {dropped.map((m, i) => (
        <div
          key={i}
          className={`p${m.player}`}
          style={{
            transform: `translate(${m.y * size}px,${m.x * size + 120}px)`,
          }}
        />
      ))}

      {winner > 0 ? (
        <Winner winner={winner} reset={reset} />
      ) : winner < 0 ? (
        <div>¡Es un empate!</div>
      ) : (
        <ActiveCoin
          turn={turn}
          dropped={dropped}
          setDropped={setDropped}
          setTurn={setTurn}
          canDrop={dropped.length < rows * cols && winner === 0}
        />
      )}
    </div>
  )
}

export default DropZone
