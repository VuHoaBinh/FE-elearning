import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-quill/dist/quill.snow.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.scss'
import { persistor, store } from './reducers'
import { theme } from './styles'

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            <ToastContainer />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
)
