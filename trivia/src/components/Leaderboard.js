import React from "react"
import PulseLoader from "react-spinners/PulseLoader"

function Leaderboard(props) {
  let scoreList = []

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const date = new Date()

  const month = months[date.getMonth()]

  if (props.highScores) {
    let fontSize = props.gameView ? 24 : 42

    scoreList = props.highScores.map((highScore, i) => {
      let dots = " . . "
      for (let j = highScore.name.length; j < 12; j += 2) {
        dots += ". "
      }
      if (i > 0) {
        let mult = i < 3 ? 2 : 1
        props.gameView ? (fontSize -= 1 * mult) : (fontSize -= 3 * mult)
      }
      let color = props.scoreIndex === i ? "#69c07e" : "black"
      return (
        <li style={{ fontSize: `${fontSize}px`, color: color }} key={i}>
          {i + 1}) {highScore.name} {dots} {highScore.score}
        </li>
      )
    })
  }

  if (props.gameView) {
    return (
      <div className="leaderboard" id="in-game-leaderboard">
        <h2>{month}'s Leaders</h2>
        <hr />
        {scoreList ? <ul>{scoreList}</ul> : <PulseLoader color={"#69c07e"} />}
      </div>
    )
  } else {
    return (
      <div className="leaderboard" id="full-leaderboard">
        <div>
          <h1>{month}'s Leaders</h1>
          <hr />
        </div>
        {scoreList ? <ul>{scoreList}</ul> : <PulseLoader color={"#69c07e"} />}
        <img src="https://res.cloudinary.com/dnj7porin/image/upload/v1585808926/crowdBG_ex9dzj.png" />
      </div>
    )
  }
}

export default Leaderboard
