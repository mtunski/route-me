import React from "react"
import { Link } from "react-router-dom"
import { Typography } from 'material-ui'

import "./Header.css"

const Header = () =>
  <header styleName="header">
    <Typography type="headline" styleName="logo"><Link to="/">RouteMe</Link></Typography>
    <nav styleName="nav">
      <Link to="/about" styleName="link">
        <Typography type="body1" styleName="link-text">About</Typography>
      </Link>
    </nav>
  </header>

export default Header
