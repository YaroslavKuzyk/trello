import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/tailwind.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/api/queryClient.ts'
import { installSessionExpiryHandler } from './features/auth/sessionExpiry.ts'

installSessionExpiryHandler(queryClient)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
