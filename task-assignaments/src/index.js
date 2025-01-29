import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Asegúrate de que este archivo CSS exista
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Estados } from './context/estados' // Importa el proveedor del contexto

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Estados>
      <App />
    </Estados>
  </React.StrictMode>
)

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals()
