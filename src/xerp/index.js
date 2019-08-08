import React from 'react'
import { RootRouter } from './routes'
import store from '../core/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import '../core/vendor'
import './styles/style.scss'
import './container/jsconfig/Vendor'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <Provider store={store}>
    <ToastContainer />
    <RootRouter />
  </Provider>
)

export default App
