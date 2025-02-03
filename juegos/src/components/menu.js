import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/menu.css'

//importin images
import LogoTicTac from './img/TicTacToe.png'
import LogoFlappyBird from './img/FlappyBird.png'
import LogoWordle from './img/logoWordle.png'
import LogoConecta4 from './img/logoConecta4.png'

function Menu() {
  return (
    <div className="menu">
      <h1 className="menu-title">Choose Your Game</h1>
      <div className="menu-options">
        {/* Tic-tac-toe game */}
        <Link to="/TicTacToe" className="menu-item">
          <img src={LogoTicTac} alt="Tic Tac Toe" className="menu-image" />
          <span className="menu-text">Tic Tac Toe</span>
        </Link>
        {/* Flappy Bird game */}
        <Link to="/FlappyBird" className="menu-item">
          <img src={LogoFlappyBird} alt="Falppy Bird" className="menu-image" />
          <span className="menu-text">Flappy Bird</span>
        </Link>
        {/* Wordle game */}
        <Link to="/Wordle" className="menu-item">
          <img src={LogoWordle} alt="Wordle" className="menu-image" />
          <span className="menu-text">Wordle</span>
        </Link>
        {/* Coneta 4 game */}
        <Link to="/Conecta4" className="menu-item">
          <img src={LogoConecta4} alt="Conecta 4" className="menu-image" />
          <span className="menu-text">Conecta 4</span>
        </Link>
      </div>

      <div className="menu-options"></div>
    </div>
  )
}

export default Menu
