import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Snackbar, IconButton } from "material-ui"
import Fade from 'material-ui/transitions/Fade'
import CloseIcon from 'material-ui-icons/Close'

import { hideNotification } from "../actions"

import './Notification.css'

const AUTO_HIDE_DURATION = 3000

const mapDispatchToProps = {
  hideNotification,
}

@connect(null, mapDispatchToProps)
export default class Notification extends PureComponent {
  state = {
    open: true,
  }

  handleRequestClose = () =>
    this.setState({ open: false })

  hide = () =>
    this.props.hideNotification(this.props.id)

  render = () =>
  console.log('render notif') ||
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={this.state.open}
    autoHideDuration={AUTO_HIDE_DURATION}
    message={<span id="message-id">{this.props.message}</span>}
    onRequestClose={this.handleRequestClose}
    onExited={this.hide}
    className="notification"
    transition={Fade}
    action={
      <IconButton
        key="close"
        color="inherit"
        onClick={this.handleRequestClose}
      >
        <CloseIcon />
      </IconButton>
    }
  />
}
