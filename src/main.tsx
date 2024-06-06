import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App'
import { CssBaseline } from '@mui/material'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
)
