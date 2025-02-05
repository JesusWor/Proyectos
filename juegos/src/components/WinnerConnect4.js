import React from 'react'
import ReactDOM from 'react-dom'

const Winner = ({ winner, reset }) => {
  const modalRoot = document.getElementById('modal-root')

  if (!modalRoot) {
    console.error('No se encontró el elemento #modal-root en el DOM.')
    return null
  }

  return ReactDOM.createPortal(
    <div className="conecta4-winner-modal">
      <div className="conecta4-winner-content">
        <h2>
          {winner === 1
            ? '🎉 Jugador 1 (🟡) ha ganado!'
            : winner === 2
            ? '🎉 Jugador 2 (🔴) ha ganado!'
            : '🤝 ¡Es un empate!'}
        </h2>
        <button className="reset-button" onClick={reset}>
          Jugar otra vez
        </button>
      </div>
    </div>,
    modalRoot
  )
}

export default Winner
