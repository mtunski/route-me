import React from 'react'
import Transition from 'react-transition-group/Transition'
import { LinearProgress } from 'material-ui/Progress'

import './MapOverlay.css'

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

const MapOverlay = ({ visible }) =>
  <Transition mountOnEnter unmountOnExit in={visible} timeout={150}>
    {(state) =>
      <div styleName="map-overlay" style={transitionStyles[state]}>
        <LinearProgress />
      </div>
    }
  </Transition>


export default MapOverlay
