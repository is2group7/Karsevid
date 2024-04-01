import React from 'react'
import ReactDOM from 'react-dom/client'
import {UserApp} from './UserApp.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserApp/>
    <p>Hola</p>
  </React.StrictMode>,
)
