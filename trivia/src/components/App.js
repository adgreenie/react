import React, { useState } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import "./style.scss"

function App() {
  const [shouldWarn, setShouldWarn] = useState(true)

  return (
    <>
      <Header setShouldWarn={setShouldWarn} />
      <Main shouldWarn={shouldWarn} />
      <Footer />
    </>
  )
}

export default App
