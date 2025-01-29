import styled, { keyframes } from 'styled-components'

// The ScoreBoard component that displays the current score and high score
const ScoreBoard = ({ score, highScore }) => {
  return (
    <ScoreContainer>
      <ScoreItem>
        <strong>Score:</strong> {score}
      </ScoreItem>
      <ScoreItem>
        <strong>High Score:</strong> {highScore}
      </ScoreItem>
    </ScoreContainer>
  )
}

export default ScoreBoard

// Animation for fading in the score board
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// Styling for the score container
const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 18px;
  position: absolute;
  top: 0;
  left: 10;
  z-index: 0; // Ensure the score is on top
  animation: ${fadeIn} 1s ease-in-out;
  border-bottom: 2px solid #4caf50;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`

// Styling for each score item
const ScoreItem = styled.div`
  margin: 0 10px;
  font-weight: bold;
  font-size: 1.2rem;
`
