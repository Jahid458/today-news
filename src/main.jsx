import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes/routes'
import AuthProvider from './Provider/AuthProvider'
import {
  QueryClient,
  QueryClientProvider
 
} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <Toaster position='top-right' reverseOrder={false} />
         <RouterProvider router={routes} />
         </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
