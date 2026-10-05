import { MotionConfig } from 'motion/react'
import { useLookAt } from '../lib/useLookAt.ts'
import { HomePage } from '../pages/HomePage.tsx'

export function App() {
  // every Sherpie on the page follows the pointer
  useLookAt()
  return (
    <MotionConfig reducedMotion="user">
      <HomePage />
    </MotionConfig>
  )
}
