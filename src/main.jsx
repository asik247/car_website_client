import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router'
import RootLayout from './Layouts/RootLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Auth/AuthProvider/AuthProvider'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
          <RootLayout></RootLayout>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
