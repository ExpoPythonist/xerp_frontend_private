import React from 'react'
import ReactDOM from 'react-dom'
import App from './xerp'
import * as serviceWorker from './core/base/serviceWorker'

const root = document.getElementById('root')

const render = Component => {
  return ReactDOM.render(<Component />, root)
}
render(App)

if (module.hot) {
  module.hot.accept('./xerp', () => {
    const NextApp = require('./xerp').default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
