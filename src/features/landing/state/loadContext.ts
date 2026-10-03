import { createContext } from 'react'
import type { Load, LoadId } from '../utils/loads.ts'

export type LoadState = { load: Load | null; choose: (id: LoadId) => void }

/** What the visitor told Sherpie is heaviest. Provided by <LoadProvider>, read with useLoad(). */
export const LoadContext = createContext<LoadState>({ load: null, choose: () => {} })
