import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import ScoreBoard from './ScrcoreFlappyBird' // Import the ScoreBoard component

// images
import backgroundImage from './img/backgroundFlappyBird-day.png'
import birdImage from './img/Pajaro.png'
import objImage from './img/TorreVerde.png'

// Constants to define game dimensions and physics
const BIRD_HEIGHT = 28
const BIRD_WIDTH = 33
const WALL_HEIGHT = 600
const WALL_WIDTH = 400
const GRAVITY = 4 // Gravity value to increase the bird's falling speed
const OBJ_WIDTH = 52
const OBJ_SPEED = 8 // Speed at which the obstacles move
const OBJ_GAP = 200

function App() {
  const navigate = useNavigate()

  // Function to navigate back to the previous page
  const handleBack = () => {
    navigate(-1)
  }

  const [isStart, setIsStart] = useState(false) // State to check if the game has started
  const [birdpos, setBirdpos] = useState(300) // State to manage bird's position
  const [objHeight, setObjHeight] = useState(0) // State to manage height of obstacles
  const [objPos, setObjPos] = useState(WALL_WIDTH) // State to manage position of obstacles
  const [score, setScore] = useState(0) // State to manage current score
  const [highScore, setHighScore] = useState(0) // State to manage high score

  // Retrieve the stored high score from local storage on component mount
  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore')
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore))
    }
  }, [])

  // Effect to apply gravity to the bird's position when the game is running
  useEffect(() => {
    let intVal
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirdpos((birdpos) => birdpos + GRAVITY)
      }, 24)
    }
    return () => clearInterval(intVal)
  }, [isStart, birdpos])

  // Effect to move obstacles and reset their position once they go off screen
  useEffect(() => {
    let objval
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED)
      }, 24)

      return () => clearInterval(objval)
    } else {
      setObjPos(WALL_WIDTH)
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)))
      if (isStart) setScore((score) => score + 1)
    }
  }, [isStart, objPos])

  // Update the high score if the current score exceeds the high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('highScore', score)
    }
  }, [score, highScore])

  // Effect to check for collisions between the bird and obstacles
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
      setScore(0)
    }
  }, [isStart, birdpos, objHeight, objPos])

  // Handle bird's jump when the game is running
  const handleStart = () => {
    if (!isStart) {
      setIsStart(true)
    } else if (birdpos < BIRD_HEIGHT) {
      setBirdpos(0)
    } else {
      setBirdpos((birdpos) => birdpos - 50)
    }
  }

  return (
    <Home onClick={handleStart}>
      <ScoreBoard score={score} highScore={highScore} />{' '}
      {/* Integrate the ScoreBoard component */}
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        {!isStart ? <Startboard>Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
      </Background>
      <BackButton onClick={handleBack}>Regresar</BackButton>
    </Home>
  )
}

export default App

// Styling for the home container
const Home = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* Light background */
`

// Styling for the game background
const Background = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* Scale the image to fill the container */
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
  margin-top: 50px; /* Add top margin */
`

// Styling for the bird
const Bird = styled.div`
  position: absolute;
  background-image: url(${birdImage});
  background-repeat: no-repeat;
  background-size: contain; /* Adjust the image */
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) =>
    props.top >= 0
      ? props.top
      : 0}px; /* Ensure it stays within the container */
  left: ${(props) => props.left}px;
`

// Styling for the obstacles
const Obj = styled.div`
  position: relative;
  background-image: url(${objImage});
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`

// Styling for the start board
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

//Stylinf for the back button
const BackButton = styled.button`
  background-color: #4caf50; /* Verde suave */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin: 20%;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
`
