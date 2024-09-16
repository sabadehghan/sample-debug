import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

document.dir = 'rtl'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
