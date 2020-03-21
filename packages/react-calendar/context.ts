import { createContext } from 'react'
import { ICalendarContext } from './shared/types'

export const CalendarContext = createContext<ICalendarContext>({} as ICalendarContext)
