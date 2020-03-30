import React, { memo } from 'react'
import Answer from './Answer'

function Question(props) {
    
    const answerArr = props.qData.incorrect_answers.map(answer => {
        //console.log('Question - incorrect_answers', answer)
        return [Math.random(), answer, false]
    })

    answerArr.push([Math.random(), props.qData.correct_answer, true])

    answerArr.sort()

    const allAnswers = answerArr.map((aData, i) => {
        //console.log('Question - aData', aData[1], aData[2])
        return <Answer
                    key={i} 
                    answer={aData[1]}
                    isCorrect={aData[2]}
                    calcScore={props.calcScore}
                />
    })

    return ( <>
        <span id="category">
            <h3>Category</h3>
            {props.qData.category}
        </span>
        <span id="difficulty">
            <h3>Difficulty</h3>
            {props.qData.difficulty}
        </span>
        <p className="question"
            dangerouslySetInnerHTML={{__html: props.qData.question}} />
        <ul className="answer-list">
            {allAnswers}
        </ul>
    </> )
}

function areEqual(prevProps, nextProps) {
    return prevProps.qData === nextProps.qData // only rerender on new question
}

export default memo(Question, areEqual)