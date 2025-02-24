import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from 'react-router-dom';
import "../styles/SnakeGame.css";

const GRID_SIZE = 20;
const CELL_SIZE = `${100 / GRID_SIZE}%`; // Tamaño de cada celda en porcentaje
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const animationRef = useRef(null);
  const lastMoveTime = useRef(0);
  const speed = 150;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const generateFood = useCallback(() => {
    let newFood = { x: 0, y: 0 };
    do {
      newFood.x = Math.floor(Math.random() * GRID_SIZE);
      newFood.y = Math.floor(Math.random() * GRID_SIZE);
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(
    (timestamp) => {
      if (!isPlaying || gameOver) return;

      if (timestamp - lastMoveTime.current > speed) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const newHead = {
            x: newSnake[0].x + direction.x,
            y: newSnake[0].y + direction.y,
          };

          // Verificar límites del tablero
          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE ||
            newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
          ) {
            setGameOver(true);
            setIsPlaying(false);
            return prevSnake;
          }

          newSnake.unshift(newHead);

          if (newHead.x === food.x && newHead.y === food.y) {
            setFood(generateFood());
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
    [direction, food, gameOver, isPlaying, generateFood]
  );

  useEffect(() => {
    if (isPlaying && !gameOver) {
      animationRef.current = requestAnimationFrame(moveSnake);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [moveSnake, isPlaying, gameOver]);

  const changeDirection = useCallback(
    (newDirection) => {
      if (
        (direction === DIRECTIONS.UP && newDirection === DIRECTIONS.DOWN) ||
        (direction === DIRECTIONS.DOWN && newDirection === DIRECTIONS.UP) ||
        (direction === DIRECTIONS.LEFT && newDirection === DIRECTIONS.RIGHT) ||
        (direction === DIRECTIONS.RIGHT && newDirection === DIRECTIONS.LEFT)
      ) {
        return;
      }
      setDirection(newDirection);
    },
    [direction]
  );

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
  }, [changeDirection]);

  //Funcio para evitar que la pagina se mueva con las flechas y solo se permita hacer scroll con el mouse
  useEffect(() => {
    const preventScrollKeys = (event) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // Evita scroll con espacio y flechas
      if (keys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, []);


  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="game-container-snake" {...handlers}>
      <h2>Snake Game</h2>
      {!isPlaying && (
        <button className="reset-button" onClick={startGame}>
          {gameOver ? "Play Again" : "Start Game"}
        </button>
      )}
      <div className="game-board-snake">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment-snake"
            style={{ left: `${segment.x * (100 / GRID_SIZE)}%`, top: `${segment.y * (100 / GRID_SIZE)}%` }}
          />
        ))}
        {food && (
          <div
            className="food-snake"
            style={{ left: `${food.x * (100 / GRID_SIZE)}%`, top: `${food.y * (100 / GRID_SIZE)}%` }}
          />
        )}
      </div>
      <h3 className="score-snake">Score: {score}</h3>
      {gameOver && <h2 className="game-over-snake">Game Over</h2>}
      <button className="reset-button" onClick={handleBack}>
        Regresar
      </button>
    </div>
  );
};

export default SnakeGame;