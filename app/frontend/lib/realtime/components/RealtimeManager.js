import React, { PureComponent } from "react"
import { connect } from "react-redux"
import ActionCable from 'actioncable'
import Guid from 'guid'

import { setClientId } from '../../../redux/actions/client'
import { realtimeCreateRoute } from '../actions'

const mapDispachToProps = {
  setClientId,
  realtimeCreateRoute,
}

@connect(null, mapDispachToProps)
export default class Notifications extends PureComponent {
  componentDidMount = () => {
    const cable = ActionCable.createConsumer()
    let clientId = localStorage.getItem('clientId')

    if (!clientId) {
      clientId = Guid.raw()
      localStorage.setItem('clientId', clientId)
    }

    this.props.setClientId(clientId)
    cable.subscriptions.create({ channel: "Channel", client_id: clientId }, {
      received: (data) => this.props.realtimeCreateRoute(data)
    })
  }

  render = () => null
}
