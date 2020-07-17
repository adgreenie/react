import React, { useState, memo } from "react"
import Answer from "./Answer"
import { Button } from "reactstrap"

function Question(props) {
  const answerArr = props.qData.incorrect_answers.map((answer) => {
    //console.log('Question - incorrect_answers', answer)
    return [Math.random(), answer, false]
  })

  answerArr.push([Math.random(), props.qData.correct_answer, true])

  answerArr.sort()

  const allAnswers = answerArr.map((aData, i) => {
    //console.log('Question - aData', aData[1], aData[2])
    return (
      <Answer
        key={i}
        answer={aData[1]}
        isCorrect={aData[2]}
        rand={Math.random()}
      />
    )
  })

  return (
    <>
      <span id="category">
        <h3>{`Category - ${
          props.catIndex ? props.categoryArr[props.catIndex] : "Any"
        }`}</h3>
        {props.isGameStarted && props.catIndex === ""
          ? props.qData.category
          : ""}
      </span>
      <span id="difficulty">
        <h3>{`Difficulty - ${props.difficulty ? props.difficulty : "Any"}`}</h3>
        {props.isGameStarted && props.difficulty === ""
          ? props.qData.difficulty
          : ""}
      </span>
      {!props.isGameStarted ? (
        <Button
          className="button"
          id="start-button"
          onClick={() => props.setIsGameStarted(true)}
        >
          Start Game
        </Button>
      ) : (
        <>
          <p
            className="question"
            dangerouslySetInnerHTML={{ __html: props.qData.question }}
          />
          <ul className="answer-list">{allAnswers}</ul>
        </>
      )}
    </>
  )
}

function areEqual(prevProps, nextProps) {
  return (
    prevProps.qData === nextProps.qData &&
    prevProps.isGameStarted === nextProps.isGameStarted
  )
}

export default memo(Question, areEqual)
