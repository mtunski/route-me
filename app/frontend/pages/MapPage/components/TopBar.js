import React, { PureComponent } from 'react'
import { Typography } from 'material-ui'

import './TopBar.css'

export default class TopBar extends PureComponent {
  render = () =>
    <div className="top-bar">
      <Typography type="headline" className="logo">RouteMe</Typography>
    </div>
}
