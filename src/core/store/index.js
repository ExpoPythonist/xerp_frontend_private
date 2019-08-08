import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import middlewares from './middlewares/middlewares'
import { updateTheme } from './middlewares/themes.middleware.js'
import { persistedState, saveState } from './persisted.store.js'
import reducers from '../../xerp/redux'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  middlewareEnhancer = applyMiddleware(...middlewares, thunk),
  composedEnhancers = composeEnhancer(middlewareEnhancer)

const store = createStore(
  reducers,
  persistedState, // second argument overrides the initial state
  composedEnhancers
)

// Add this chunk of code:
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Note! Make sure this path matches your rootReducer import exactly
  // Does not play well with "NODE_PATH" aliasing.
  module.hot.accept('../../xerp/redux', () => {
    const newRootReducer = require('../../xerp/redux').default
    store.replaceReducer(newRootReducer)
  })
}

// add a listener that will be invoked on any state change
store.subscribe(() => {
  saveState(store.getState())
})

// Update the initial theme
updateTheme(store.getState())

export default store
