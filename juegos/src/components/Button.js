import React from 'react'

const Button = ({ index, value, handleMove }) => {
  return (
    <button
      className="game-button"
      onClick={() => handleMove(index)}
      style={{
        width: '100px',
        height: '100px',
        fontSize: '2rem',
        margin: '5px',
      }}
    >
      {value}
    </button>
  )
}

export default Button
