import React from 'react'
import Board from './BoardConnect4'
import DropZone from './DropZoneConnect4'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Conecta4Game() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="conecta-app">
      <ToastContainer position="top-center" />
      <DropZone />
      <Board />
      <button className="reset-button" onClick={handleBack}>
        Regresar
      </button>
    </div>
  )
}

export default Conecta4Game
