import React, { PureComponent } from 'react'

import { Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'
import ModeEditIcon from 'material-ui-icons/ModeEdit'

import './MapControls.css'

export default class MapControls extends PureComponent {
  render = () =>
    <div className="map-controls">
      <Button fab color="primary" onClick={this.props.onZoomIn}>
        <AddIcon />
      </Button>
      <Button fab color="primary" onClick={this.props.onZoomOut}>
        <RemoveIcon />
      </Button>
    </div>
}
