import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/menu.css'
import LogoTicTac from './img/TicTacToe.png'
import LogoFlappyBird from './img/FlappyBird.png'

function Menu() {
  return (
    <div className="menu">
      <h1 className="menu-title">Choose Your Game</h1>
      <div className="menu-options">
        {/* Link a la página del juego */}
        <Link to="/TicTacToe" className="menu-item">
          <img src={LogoTicTac} alt="Tic Tac Toe" className="menu-image" />
          <span className="menu-text">Tic Tac Toe</span>
        </Link>
        {/* Puedes agregar más opciones para otros juegos */}
        <Link to="/FlappyBird" className="menu-item">
          <img src={LogoFlappyBird} alt="Falppy Bird" className="menu-image" />
          <span className="menu-text">Flappy Bird</span>
        </Link>
      </div>
    </div>
  )
}

export default Menu
