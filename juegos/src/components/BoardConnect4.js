import React from 'react'
import { rows, cols } from '../constant/constant'

function BoardConnect4() {
  const board = new Array(rows).fill().map((_) => new Array(cols).fill())

  return (
    <div className="conecta4-board">
      {board.map((row, i) => row.map((col, j) => <div key={i + '-' + j} />))}
    </div>
  )
}

export default BoardConnect4
