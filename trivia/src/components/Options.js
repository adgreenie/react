import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

function Options(props) {
  const [catIndex, setCatIndex] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const handleClick = () => {
    props.setCatIndexFromMain(catIndex)
    props.setDifficultyFromMain(difficulty)
  }

  const handleCategoryChange = (e) => {
    setCatIndex(e.target.value)
  }

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value)
  }

  const categoryOptions = props.categoryArr.map((category, i) => {
    return (
      <option key={i} value={i}>
        {category}
      </option>
    )
  })

  return (
    <div className="options">
      <div className="inner-options">
        <h2>Current Game Settings:</h2>
        Category:
        <span className="curr-option">
          {props.catIndexFromMain
            ? props.categoryArr[props.catIndexFromMain]
            : "Any Category"}
        </span>
        <br />
        Difficulty:
        <span className="curr-option" id="curr-dif">
          {props.difficultyFromMain
            ? props.difficultyFromMain
            : "Any Difficulty"}
        </span>
      </div>
      <div className="inner-options">
        <h2>Select New Options:</h2>
        <div>
          Category:
          <select name="category" onChange={handleCategoryChange}>
            <option value="">Any Category</option>
            {categoryOptions}
          </select>
        </div>
        <div>
          Difficulty:
          <select onChange={handleDifficultyChange}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <Link to="/game">
        <Button className="button" onClick={handleClick}>
          Save Settings
        </Button>
      </Link>
      <img src="https://res.cloudinary.com/dnj7porin/image/upload/v1585946550/stage-1876094_1920_b3u3hp.png" />
    </div>
  )
}

export default Options
