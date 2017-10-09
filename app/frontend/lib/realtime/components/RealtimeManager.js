import React, { PureComponent } from "react"
import { connect } from "react-redux"
import ActionCable from 'actioncable'
import Guid from 'guid'

import { setClientId } from '../../../redux/actions/client'

const mapDispachToProps = {
  setClientId,
}

@connect(null, mapDispachToProps)
export default class Notifications extends PureComponent {
  componentDidMount = () => {
    const cable = ActionCable.createConsumer()
    const clientId = Guid.raw()

    this.props.setClientId(clientId)
    cable.subscriptions.create({ channel: "Channel", client_id: clientId }, {
      received: (data) => console.log(data)
    })
  }

  componentWillUnmount = () => {

  }

  render = () => null
}
