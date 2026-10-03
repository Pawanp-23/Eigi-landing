import { useState, type ReactNode } from 'react'
import { loadById, type LoadId } from '../utils/loads.ts'
import { LoadContext } from './loadContext.ts'

/** Holds what the visitor told Sherpie is heaviest, for every section that personalises around it. */
export function LoadProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<LoadId | null>(null)
  return <LoadContext.Provider value={{ load: loadById(id), choose: setId }}>{children}</LoadContext.Provider>
}
