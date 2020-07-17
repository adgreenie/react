import React, { useEffect, useState, createContext, useContext } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import Question from "./Question"
import HighScore from "./HighScore"
import Leaderboard from "../Leaderboard"
import PulseLoader from "react-spinners/PulseLoader"
import { Prompt } from "react-router"
import "./game.scss"

export const DataContext = createContext()

function Gameboard(props) {
  const [questionArr, setQuestionArr] = useState(false)
  const [qNum, setQNum] = useState(1)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [nextVis, setNextVis] = useState("hidden")
  const [nextOpacity, setNextOpacity] = useState(0)

  const calcScore = (isCorrect) => {
    setIsAnswered(true)

    if (isCorrect) {
      const diffs = {
        easy: 1,
        medium: 2,
        hard: 3,
      }
      props.dispatch({
        type: "ADD",
        value: diffs[questionArr[qNum - 1].difficulty],
      })
    } else {
      props.dispatch({ type: "SUB" })
    }

    setNextVis("visible")
    setNextOpacity(1)
  }

  const nextQuestion = () => {
    setNextVis("hidden")
    setNextOpacity(0)

    qNum < 10 ? setQNum(qNum + 1) : gameOver()

    setIsAnswered(false)
  }

  const gameOver = () => {
    setIsGameOver(true)
    setIsGameStarted(false)
  }

  useEffect(() => {
    const makeApiCall = async () => {
      const catNum = props.catIndex ? parseInt(props.catIndex) + 9 : ""
      const url = `https://opentdb.com/api.php?amount=10&category=${catNum}&difficulty=${props.difficulty}`
      console.log("Gameboard - makeApiCall - url", url)
      const res = await fetch(url)
      const json = await res.json()
      console.log("Gameboard - makeApiCall - json.results", json.results)
      setQuestionArr(json.results)
    }
    makeApiCall()
    props.dispatch({ type: "RESET" })
  }, [])

  if (!questionArr) {
    return (
      <div className="loading">
        <PulseLoader color={"#69c07e"} />
      </div>
    )
  }

  const qDisplay = (
    <div className="gameboard">
      {isGameStarted && <h2>Question {qNum}</h2>}
      <DataContext.Provider value={{ calcScore, isAnswered }}>
        <Question
          qData={questionArr[qNum - 1]}
          catIndex={props.catIndex}
          difficulty={props.difficulty}
          categoryArr={props.categoryArr}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
        />
      </DataContext.Provider>
      {isGameStarted && <span id="score">Score: {props.score}</span>}
      <button
        style={{ visibility: nextVis, opacity: nextOpacity }}
        onClick={nextQuestion}
      >
        Next
      </button>
      <Leaderboard gameView={true} highScores={props.highScores} />
    </div>
  )

  const endDisplay = (
    <div className="game-over">
      <h2>Final score:</h2>
      <h1>{props.score}</h1>
      <h3>Thanks for playing!</h3>
      <Link to="/leaderboard">Check the Leaderboard</Link>
      <Button className="button" onClick={() => window.location.reload()}>
        Start A New Game
      </Button>
    </div>
  )

  return (
    <>
      {!isGameOver ? (
        qDisplay
      ) : props.checkForHighScore() ? (
        <HighScore score={props.score} submitScore={props.submitScore} />
      ) : (
        endDisplay
      )}
      <Prompt
        when={isGameStarted}
        message="You will lose all progress from your current game by leaving this page. Are you sure?"
      />
      )
    </>
  )
}

export default Gameboard
