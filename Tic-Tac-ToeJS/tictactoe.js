const prompt = require('prompt-sync')()

let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
let currentPlayer = '🐐'
let gameActive = true

/* Imprimir el tablero */
function printBoard() {
  console.log(`
      ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
      ---------
      ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
      ---------
      ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
    `)
}

/* Movimientos y checar si alguna casilla ya fue tomada */
function handleMove(position) {
  if (gameBoard[position] === ' ') {
    gameBoard[position] = currentPlayer
  } else {
    console.log('Esta casilla ya fue tomada')
    return false
  }

  /* metodo para ver si algun jugador gano */
  if (checkWin()) {
    console.log(`El jugador ${currentPlayer} ha ganado!`)
    printBoard()
    gameActive = false
    return true
  }

  /* Checa si el juego quedo en empate */
  if (gameBoard.every((cell) => cell !== ' ')) {
    console.log('El juego quedo en empate')
    gameActive = false
    return true
  }

  /* figuras para cada uno de los jugadores */
  currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐'
  return true
}

/* Combinaciones para verificar si gano un jugador */
function checkWin() {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  /* Checa cada condicion y regresa true cuando una se cumple */
  return conditions.some((conditions) => {
    const [a, b, c] = conditions
    return (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    )
  })
}

/* main's program */
while (gameActive) {
  printBoard()
  const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `)

  if (position >= 0 && position <= 8) {
    handleMove(parseInt(position))
  } else {
    console.log(
      'La posicion ingresada no esta dentro de los parametros solicitados'
    )
  }
}
