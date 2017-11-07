import React from "react"
import PropTypes from "prop-types"

import Header from "../components/Header"

const MainLayout = (props) => (
  <div>
    <Header />
    <div className="container app-content-container">
      {props.children}
    </div>
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
