import { Estados } from './context/estados'
import Form from './components/formularios'
import Lista from './components/listaTareas'
import Notificacion from './components/notificaciones'
import { useState } from 'react'
import './styles/estiloFormulario.css'

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  return (
    <Estados>
      <div className="app">
        <h1>Gestor de Tareas</h1>
        <Notificacion />
        <button className="open-form-button" onClick={toggleFormVisibility}>
          {isFormVisible ? 'Cerrar Formulario' : 'Agregar Tarea'}
        </button>

        {isFormVisible && (
          <div className="form-overlay">
            <Form onClose={() => setIsFormVisible(false)} />
          </div>
        )}

        <Lista />
      </div>
    </Estados>
  )
}

export default App
