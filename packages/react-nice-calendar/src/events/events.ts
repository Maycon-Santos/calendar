import { EventFactoryData, EventName, EventDispatcher } from '../shared-types'
import { setSelectedDate } from './factory/set-selected-date'
import { removeSelectedDate } from './factory/remove-selected-date'
import { setDataToView } from './factory/set-data-to-view'

type Events = {
  [P in EventName]: (...args: any) => any
}

export default function eventsFactory (
  data: EventFactoryData
): EventDispatcher {
  const { calendarProvider, setDateMouseOver } = data

  const events: Events = {
    'calendar.prevMonth': calendarProvider.prevMonth,
    'calendar.nextMonth': calendarProvider.nextMonth,
    'calendar.prevYear': calendarProvider.prevYear,
    'calendar.nextYear': calendarProvider.nextYear,
    'calendar.prevYears': calendarProvider.prevYears,
    'calendar.nextYears': calendarProvider.nextYears,
    'calendar.goto': calendarProvider.goto,
    setDateMouseOver: setDateMouseOver,
    setSelectedDate: setSelectedDate(data),
    removeSelectedDate: removeSelectedDate(data),
    setDataToView: setDataToView(data)
  }

  return (eventName, ...eventValue) => events[eventName](...eventValue)
}
