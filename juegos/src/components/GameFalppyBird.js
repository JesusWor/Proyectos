import styled from 'styled-components' // Import styled-components for CSS-in-JS
import { useEffect, useState } from 'react' // Import React hooks for state and side effects
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css' // Import CSS for toast notifications
import ScoreBoard from './ScrcoreFlappyBird' // Import the ScoreBoard component

// images
import backgroundImage from './img/backgroundFlappyBird-day.png' // Background image
import birdImage from './img/Pajaro.png' // Bird image
import objImage from './img/TorreVerde.png' // Obstacle image

// Constants to define game dimensions and physics
const BIRD_HEIGHT = 28 // Bird height
const BIRD_WIDTH = 33 // Bird width
const WALL_HEIGHT = 600 // Wall (game area) height
const WALL_WIDTH = 400 // Wall (game area) width
const GRAVITY = 0.92 // Gravity constant
const FLAP_STRENGTH = 11 // Flap strength (jump force)
const MAX_VELOCITY = 15 // Maximum velocity of the bird
const UPDATE_FREQUENCY = 16 // Update frequency in milliseconds
const OBJ_WIDTH = 52 // Obstacle width
const OBJ_SPEED = 9 // Obstacle speed
const OBJ_GAP = 200 // Gap between obstacles
const BACKGROUND_SPEED = 5 // Background speed
const MIN_BIRD_POSITION = 0 // Minimum bird position (top)
const MAX_BIRD_POSITION = WALL_HEIGHT - BIRD_HEIGHT // Maximum bird position (bottom)

function App() {
  const navigate = useNavigate() // Hook to navigate between routes

  const handleBack = () => {
    navigate(-1)
  }

  const [isStart, setIsStart] = useState(false)
  const [birdpos, setBirdpos] = useState(300)
  const [velocity, setVelocity] = useState(0)
  const [objHeight, setObjHeight] = useState(0)
  const [objPos, setObjPos] = useState(WALL_WIDTH)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [backgroundX, setBackgroundX] = useState(0)

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore') // Get high score from local storage
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore)) // Parse and set high score
    }
  }, [])

  useEffect(() => {
    let intVal // Interval ID
    if (isStart) {
      // If the game is started
      intVal = setInterval(() => {
        // Set interval to update bird position
        // Update velocity
        setVelocity(
          // (prevVelocity) => Math.max(-MAX_VELOCITY, prevVelocity  + 0.15 - GRAVITY) // Apply gravity, limit velocity
          (prevVelocity) => Math.max(-MAX_VELOCITY, prevVelocity - GRAVITY)
        )

        // Calculate new bird position
        let newPos = birdpos - velocity

        // Limit bird position
        newPos = Math.max(
          MIN_BIRD_POSITION,
          Math.min(MAX_BIRD_POSITION, newPos)
        )

        // Set new bird position
        setBirdpos(newPos)
      }, UPDATE_FREQUENCY)
    }
    return () => clearInterval(intVal)
  }, [isStart, birdpos, velocity])

  useEffect(() => {
    let objval // Interval ID
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED)
      }, 24)
      return () => clearInterval(objval)
    } else {
      // If obstacles are off-screen
      setObjPos(WALL_WIDTH)
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)))
      if (isStart) setScore((score) => score + 1)
    }
  }, [isStart, objPos])

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('highScore', score)
    }
  }, [score, highScore])

  useEffect(() => {
    const topObj = birdpos >= 0 && birdpos < objHeight
    const bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >= WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false)
      setBirdpos(300)
      setVelocity(0)
      setScore(0)
    }
  }, [isStart, birdpos, objHeight, objPos])

  const handleStart = () => {
    if (!isStart) {
      setIsStart(true)
    } else {
      setVelocity(FLAP_STRENGTH)
    }
  }

  useEffect(() => {
    let backgroundInterval
    if (isStart) {
      backgroundInterval = setInterval(() => {
        setBackgroundX((prevX) => prevX - BACKGROUND_SPEED)
      }, UPDATE_FREQUENCY)
    }
    return () => clearInterval(backgroundInterval)
  }, [isStart])

  return (
    <Home onClick={handleStart}>
      {' '}
      <ScoreBoard score={score} highScore={highScore} />{' '}
      <Background
        height={WALL_HEIGHT}
        width={WALL_WIDTH}
        style={{ backgroundPositionX: `${backgroundX}px` }} // Move background
      >
        {!isStart ? <Startboard>Click To Start</Startboard> : null}{' '}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />{' '}
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />{' '}
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />{' '}
        {/* Bottom obstacle */}
      </Background>
      <BackButton onClick={handleBack}>Regresar</BackButton> {/* Back button */}
    </Home>
  )
}

export default App

const Home = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: repeat-x;
  background-position: center;
  background-size: cover;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
  margin-top: 50px;
`

const Bird = styled.div`
  position: absolute;
  background-image: url(${birdImage});
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`

const Obj = styled.div`
  position: relative;
  background-image: url(${objImage});
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`

const BackButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
`
