import React from "react"
import PropTypes from "prop-types"

import Header from "../components/Header"

const MainLayout = (props) => (
  [
    <Header key="header" />,
    <div className="app" key="app">
      {props.children}
    </div>
  ]
)

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
