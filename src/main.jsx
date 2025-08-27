import React from 'react'
import ReactDOM from 'react-dom/client'
import AlgoForge from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AlgoForge />
    </AuthProvider>
  </React.StrictMode>,
)
