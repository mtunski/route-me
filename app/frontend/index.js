import React from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import ReactOnRails from "react-on-rails"

import App from "./App"

const appRenderer = (props, railsContext, domNodeId) => {
  const renderApp = () => render(
    <AppContainer>
      <App
        props={props}
        railsContext={railsContext}
      />
    </AppContainer>,
    document.getElementById(domNodeId)
  )

  renderApp()
  if (module.hot) {
    module.hot.accept("./App", () => { renderApp() })
  }
}

ReactOnRails.register({
  App: appRenderer,
})
