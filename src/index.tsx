import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { Toaster } from 'sonner'

import { routes } from '~/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/lib/query-client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster position="top-right" richColors closeButton duration={4000} /*5second*/ />
    </QueryClientProvider>
  </StrictMode>,
)
