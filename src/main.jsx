import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router'
import RootLayout from './Layouts/RootLayout'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}>
    <RootLayout></RootLayout>
   </RouterProvider>
  </StrictMode>,
)
