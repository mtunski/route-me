import React from "react"
import { Link } from "react-router-dom"

import "./Header.css"

const Header = () =>
  <header styleName="header">
    <h1><Link to="/">RouteMe</Link></h1>
    <h1><Link to="/about">About</Link></h1>
  </header>

export default Header
