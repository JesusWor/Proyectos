import { useEffect, useState } from 'react'

const ActiveCoin = ({
  turn,
  dropped,
  setDropped,
  setTurn,
  canDrop,
  hoveredColumn,
}) => {
  const [column, setColumn] = useState(0)
  const [row, setRow] = useState()

  const handleKeyDown = (e) => {
    if (!canDrop) return
    if (e.keyCode === 37 && column > 0) {
      setColumn(column - 1)
    } else if (e.keyCode === 39) {
      if (column === undefined) {
        setColumn(0)
      } else if (column < 6) {
        setColumn(column + 1)
      }
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      dropCoin(column)
    }
  }

  const dropCoin = (col) => {
    if (dropped.find((drop) => drop.x === 0 && drop.y === col)) {
      return
    }

    const len = 5 - dropped.filter((drop) => drop.y === col).length
    if (len < 0) return

    setRow(len)
    setTimeout(() => {
      setDropped([...dropped, { x: len, y: col || 0, player: turn }])
      setTurn(turn === 1 ? 2 : 1)
    }, 400)
  }

  useEffect(() => {
    setColumn(0)
    setRow(undefined)
  }, [turn])

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown, false)
    return () => document.removeEventListener('keyup', handleKeyDown)
  }, [column, dropped])

  useEffect(() => {
    if (hoveredColumn !== null) {
      setColumn(hoveredColumn)
    }
  }, [hoveredColumn])

  return (
    <div
      className={`active p${turn} column-${column} row-${
        row === undefined ? '-' : row
      }`}
    />
  )
}

export default ActiveCoin
