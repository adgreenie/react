import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap"
import { withRouter } from "react-router"

function Header(props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleActive = (path) => {
    return path === props.location.pathname ? "active" : ""
  }

  return (
    <header>
      <Navbar color="black" light expand="md">
        <Link to="/" className="title">
          Answer10
        </Link>
        <NavbarToggler id="toggler" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-list" navbar>
            <Link className={handleActive("/game")} to="/game">
              Game
            </Link>
            <Link className={handleActive("/instructions")} to="/instructions">
              Instructions
            </Link>
            <Link className={handleActive("/options")} to="/options">
              Options
            </Link>
            <Link className={handleActive("/leaderboard")} to="/leaderboard">
              Leaderboard
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}

export default withRouter(Header)
