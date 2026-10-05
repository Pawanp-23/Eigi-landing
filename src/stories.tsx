import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StoriesPage from './pages/StoriesPage/index.tsx'
import { initAnalytics } from './utils/analytics.ts'

initAnalytics()

createRoot(document.getElementById('root')!).render(<StrictMode><StoriesPage /></StrictMode>)
