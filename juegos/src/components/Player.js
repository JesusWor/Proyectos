import React from 'react'

const Player = ({ currentPlayer }) => {
  return (
    <div className="player-info">
      <h2>Jugador actual: {currentPlayer}</h2>
    </div>
  )
}

export default Player
