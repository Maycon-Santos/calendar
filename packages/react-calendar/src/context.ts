import { createContext } from 'react'
import { CalendarContext as CalendarContextType } from './shared-types'

export const CalendarContext = createContext<CalendarContextType>(
  {} as CalendarContextType
)
