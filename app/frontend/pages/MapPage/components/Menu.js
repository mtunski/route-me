import React, { PureComponent } from 'react'
import { Typography } from 'material-ui'

import Form from './Form'

import './Menu.css'

export default class Menu extends PureComponent {
  render = () =>
    <div styleName="menu">
      <Typography type="title">Algorithm settings</Typography>
      <Form />
    </div>
}
