import { useEffect, useState } from 'react'

const ActiveCoin = ({ turn, dropped, setDropped, setTurn, canDrop }) => {
  const [column, setColumn] = useState()
  const [row, setRow] = useState()

  const handleKeyDown = (e) => {
    if (!canDrop) return
    if (e.keyCode === 37 && column > 0) {
      setColumn(column - 1)
    } else if (e.keyCode === 39) {
      if (column === undefined) {
        setColumn(1)
      } else if (column < 6) {
        setColumn(column + 1)
      }
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      // Verificar si la columna está llena
      if (dropped.find((drop) => drop.x === 0 && drop.y === (column || 0))) {
        return
      }
      const len = 5 - dropped.filter((drop) => drop.y === (column || 0)).length

      // Asegurarse de que no se agregue más allá del límite
      if (len < 0) return // No permitir agregar más monedas si la columna está llena

      setRow(len)
      setTimeout(() => {
        setDropped([...dropped, { x: len, y: column || 0, player: turn }])
        setTurn(turn === 1 ? 2 : 1)
      }, 400)
    }
  }

  useEffect(() => {
    // Reiniciar columna y fila al cambiar de turno
    setColumn(0) // Reiniciar a la columna inicial
    setRow(undefined) // Reiniciar fila
  }, [turn])

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown, false)

    return () => document.removeEventListener('keyup', handleKeyDown)
  })

  return (
    <div
      className={`active p${turn} column-${column || '-'} row-${
        row === undefined ? '-' : row
      }`}
    />
  )
}

export default ActiveCoin
