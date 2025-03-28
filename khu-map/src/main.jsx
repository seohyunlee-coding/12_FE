import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import Map from './components/Map.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Map />
  </StrictMode>,
)
