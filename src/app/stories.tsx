import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/global.css'
import { StoriesPage } from './StoriesPage.tsx'
import { initAnalytics } from '../lib/analytics.ts'

initAnalytics()

createRoot(document.getElementById('root')!).render(<StrictMode><StoriesPage /></StrictMode>)
