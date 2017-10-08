import React, { PureComponent } from "react"
import { connect } from "react-redux"

import Notification from "./Notification"

const mapStateToProps = (state) => ({
  notifications: Object.values(state.notifications),
})

@connect(mapStateToProps, null)
export default class Notifications extends PureComponent {
  render = () =>
    this.props.notifications.map((notification) =>
      <Notification
        {...notification}
        key={notification.id}
      />
    )
}
