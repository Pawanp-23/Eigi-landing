import { useContext } from 'react'
import { LoadContext } from './loadContext.ts'

/** The visitor's chosen load (or null) and a way to change it. */
export const useLoad = () => useContext(LoadContext)
