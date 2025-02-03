import React, { useState, useRef, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const palabras = [
  'abaco',
  'abajo',
  'abeto',
  'acero',
  'acido',
  'actor',
  'adios',
  'afect',
  'aguas',
  'alamo',
  'algas',
  'almas',
  'altas',
  'amigo',
  'ancho',
  'antes',
  'añoso',
  'apoyo',
  'arbol',
  'arena',
  'aroba',
  'asilo',
  'atajo',
  'audaz',
  'avion',
  'baile',
  'balan',
  'barco',
  'basas',
  'bazar',
  'bebes',
  'bicho',
  'bison',
  'broma',
  'burro',
  'cabra',
  'cacao',
  'canto',
  'carro',
  'cielo',
  'cinta',
  'claro',
  'comas',
  'coraz',
  'cuero',
  'damas',
  'denso',
  'dolar',
  'dosis',
  'dulce',
  'echar',
  'edema',
  'ejeas',
  'eject',
  'enano',
  'estar',
  'famos',
  'fases',
  'fuego',
  'ganas',
  'gente',
  'gordo',
  'grano',
  'hacer',
  'huevo',
  'joven',
  'jugar',
  'lados',
  'luzca',
  'marca',
  'mujer',
  'nacer',
  'nieve',
  'oliva',
  'papel',
  'pasar',
  'piano',
  'racer',
  'rango',
  'saber',
  'silla',
  'somos',
  'tener',
  'tomar',
  'unais',
  'volar',
  'yates',
  'zorro',
]

const obtenerPalabraAleatoria = () =>
  palabras[Math.floor(Math.random() * palabras.length)]

const tecladoLetras = 'abcdefghijklmnopqrstuvwxyz'.split('')

function Wordle() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const [palabraAdivinar, setPalabraAdivinar] = useState(
    obtenerPalabraAleatoria
  )
  const [intentos, setIntentos] = useState([])
  const [input, setInput] = useState(Array(5).fill(''))
  const [mensaje, setMensaje] = useState('')
  const [teclado, setTeclado] = useState(
    tecladoLetras.reduce((acc, letra) => ({ ...acc, [letra]: '' }), {})
  )
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const manejarCambio = (index, e) => {
    const nuevaLetra = e.target.value.toLowerCase()
    if (/^[a-z]?$/.test(nuevaLetra)) {
      const nuevoInput = [...input]
      nuevoInput[index] = nuevaLetra
      setInput(nuevoInput)
      if (nuevaLetra && index < 4) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const manejarBorrar = (index, e) => {
    if (e.key === 'Backspace' && !input[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    const palabraIngresada = input.join('')
    // Validación de longitud
    if (palabraIngresada.length !== 5) {
      setMensaje('La palabra debe tener 5 letras.')
      return
    }

    const resultadoIntento = Array(5).fill({ letra: '', color: 'gray' })
    const palabraAdivinarArray = palabraAdivinar.split('')
    const letrasUsadas = {}

    // Primero, marcar las letras correctas (verde) y contar las letras correctas en la palabra a adivinar
    palabraIngresada.split('').forEach((letra, index) => {
      if (letra === palabraAdivinarArray[index]) {
        resultadoIntento[index] = { letra, color: 'green' }
        letrasUsadas[letra] = (letrasUsadas[letra] || 0) + 1
      }
    })

    // Luego, marcar las letras presentes pero en posiciones incorrectas (amarillo)
    palabraIngresada.split('').forEach((letra, index) => {
      if (
        resultadoIntento[index].color !== 'green' &&
        palabraAdivinar.includes(letra)
      ) {
        const totalenPalabra = palabraAdivinarArray.filter(
          (l) => l === letra
        ).length
        const yaContadas = letrasUsadas[letra] || 0
        if (yaContadas < totalenPalabra) {
          resultadoIntento[index] = { letra, color: 'yellow' }
          letrasUsadas[letra] = yaContadas + 1
        }
      }
    })

    // Marcar las letras que no están en la palabra como grises en el tablero
    palabraIngresada.split('').forEach((letra, index) => {
      if (resultadoIntento[index].color === 'gray') {
        resultadoIntento[index] = { letra, color: 'gray' }
      }
    })

    // Actualizar el teclado con colores
    palabraIngresada.split('').forEach((letra, index) => {
      if (!teclado[letra] || teclado[letra] === 'gray') {
        setTeclado((prev) => {
          const nuevoTeclado = { ...prev }
          nuevoTeclado[letra] = resultadoIntento[index].color
          return nuevoTeclado
        })
      }
    })

    setIntentos([...intentos, resultadoIntento])
    setInput(Array(5).fill(''))
    inputRefs.current[0]?.focus()

    if (intentos.length >= 5) {
      toast.success(
        `¡Lo siento!, Se han agotado los intentos la palabra era ${palabraAdivinar}.`
      )
      setTimeout(() => reiniciarJuego(), 5000)
    }
    if (palabraIngresada === palabraAdivinar) {
      toast.success(
        '¡Felicidades! Has adivinado la palabra. Reiniciando el juego...'
      )
      setTimeout(() => reiniciarJuego(), 5000) // Reinicia el juego después de 3 segundos
    }
  }

  const reiniciarJuego = () => {
    setPalabraAdivinar(obtenerPalabraAleatoria())
    setIntentos([])
    setInput(Array(5).fill(''))
    setMensaje('')
    setTeclado(
      tecladoLetras.reduce((acc, letra) => ({ ...acc, [letra]: '' }), {})
    )
  }

  return (
    <div className="wordle-container">
      <ToastContainer />
      <div className="wordle-left">
        <form onSubmit={manejarSubmit} className="wordle-input-container">
          {input.map((letra, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={letra}
              onChange={(e) => manejarCambio(index, e)}
              onKeyDown={(e) => manejarBorrar(index, e)}
              maxLength="1"
              className="wordle-input"
            />
          ))}
          <button className="reset-button" type="submit">
            Intentar
          </button>
        </form>
      </div>
      <div className="wordle-right">
        <h1>Wordle Clone</h1>
        <div className="wordle-intentos">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="wordle-intento">
              {(intentos[i] || Array(5).fill({ letra: '', color: '' })).map(
                (letra, j) => (
                  <span key={j} className={`wordle-letra ${letra.color}`}>
                    {letra.letra}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
        <div className="wordle-keyboard">
          {tecladoLetras.map((letra) => (
            <span key={letra} className={`wordle-key ${teclado[letra]}`}>
              {letra}
            </span>
          ))}
        </div>
        <button className="reset-button" onClick={reiniciarJuego}>
          Reiniciar
        </button>
        <button className="reset-button" onClick={handleBack}>
          Regresar
        </button>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  )
}

export default Wordle
