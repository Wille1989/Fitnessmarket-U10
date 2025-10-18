import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MessageProvider } from './context/MessageProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </StrictMode>,
)
