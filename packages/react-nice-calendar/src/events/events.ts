import { EventFactoryData, EventType, EventDispatcher } from '../shared-types'
import { addSelectedDate } from './factory/set-selected-date'
import { removeSelectedDate } from './factory/remove-selected-date'
import { setDataToView } from './factory/set-data-to-view'

type Events = {
  [P in EventType]: (...args: any) => any
}

export default function eventsFactory (data: EventFactoryData) {
  return (): EventDispatcher => {
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
      addSelectedDate: addSelectedDate(data),
      removeSelectedDate: removeSelectedDate(data),
      setDataToView: setDataToView(data)
    }

    return (eventName, ...eventValue) => events[eventName](...eventValue)
  }
}
