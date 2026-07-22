import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router'
import RootLayout from './Layouts/RootLayout'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <RootLayout></RootLayout>
      </RouterProvider>
    </QueryClientProvider>




    {/* 
   
   <RouterProvider router={router}>
    <RootLayout></RootLayout>
   </RouterProvider>
   ay ta AuthProvider ar child hobe then all code QueryClientProvider  ar client hobe
   */}

  </StrictMode>,
)
