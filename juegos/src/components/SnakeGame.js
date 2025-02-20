import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/SnakeGame.css";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const animationRef = useRef(null); // Referencia para manejar la animación
  const lastMoveTime = useRef(0); // Tiempo de la última actualización
  const speed = 150; // Tiempo en ms entre movimientos

  function generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  const moveSnake = useCallback(
    (timestamp) => {
      if (gameOver) return;

      if (timestamp - lastMoveTime.current > speed) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const newHead = {
            x: newSnake[0].x + direction.x,
            y: newSnake[0].y + direction.y,
          };

          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE ||
            newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
          ) {
            setGameOver(true);
            return prevSnake;
          }

          newSnake.unshift(newHead);

          if (newHead.x === food.x && newHead.y === food.y) {
            setFood(generateFood);
            setScore((prevScore) => prevScore + 1);
          } else {
            newSnake.pop();
          }

          return newSnake;
        });

        lastMoveTime.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(moveSnake);
    },
    [direction, food, gameOver]
  );

  useEffect(() => {
    if (!gameOver) {
      animationRef.current = requestAnimationFrame(moveSnake);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [moveSnake, gameOver]);

  const changeDirection = (newDirection) => {
    if (
      (direction === DIRECTIONS.UP && newDirection === DIRECTIONS.DOWN) ||
      (direction === DIRECTIONS.DOWN && newDirection === DIRECTIONS.UP) ||
      (direction === DIRECTIONS.LEFT && newDirection === DIRECTIONS.RIGHT) ||
      (direction === DIRECTIONS.RIGHT && newDirection === DIRECTIONS.LEFT)
    ) {
      return;
    }
    setDirection(newDirection);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeDirection(DIRECTIONS.LEFT),
    onSwipedRight: () => changeDirection(DIRECTIONS.RIGHT),
    onSwipedUp: () => changeDirection(DIRECTIONS.UP),
    onSwipedDown: () => changeDirection(DIRECTIONS.DOWN),
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          changeDirection(DIRECTIONS.UP);
          break;
        case "ArrowDown":
          changeDirection(DIRECTIONS.DOWN);
          break;
        case "ArrowLeft":
          changeDirection(DIRECTIONS.LEFT);
          break;
        case "ArrowRight":
          changeDirection(DIRECTIONS.RIGHT);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div className="game-container" {...handlers}>
      <h2>Snake Game</h2>
      <div className="game-board">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{ left: segment.x * CELL_SIZE, top: segment.y * CELL_SIZE }}
          />
        ))}
        <div className="food" style={{ left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }} />
      </div>
      <h3 className="score">Score: {score}</h3>
      {gameOver && <h2 className="game-over">Game Over</h2>}
    </div>
  );
};

export default SnakeGame;
