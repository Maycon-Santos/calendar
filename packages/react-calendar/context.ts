import { createContext } from 'react'
import { ICalendarContext } from './types'

export const CalendarContext = createContext<ICalendarContext>({} as ICalendarContext)
