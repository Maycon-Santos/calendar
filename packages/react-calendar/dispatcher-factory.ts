import { Dispatch, SetStateAction } from 'react'
import { TEventType, ICalendarProps, TDataToView, TEventDispatcher } from "./types";
import CalendarProvider from "../calendar-provider/calendar-provider";
import defaultProps from "./defaultProps";
import dateDiff from "./utils/date-diff";
import dateSort from "./utils/date-sort";
import getDatesRange from './utils/get-dates-range';

interface IArgs {
  calendarProvider: CalendarProvider
  setDateMouseOver: Dispatch<SetStateAction<Date | null>>
  setDataToView: Dispatch<SetStateAction<TDataToView>>
  props: ICalendarProps
}

type TEvents = {
  [P in TEventType]: (...args: any) => any
}

export default function dispatcherFactory (args: IArgs): TEventDispatcher {
  const {
    calendarProvider,
    setDateMouseOver,
    setDataToView,
    props: {
      bind,
      onChangeSelectedDate,
      filterInvalidDates
    }
  } = args

  function emitSelectedDateEvent (date: Date[] | Date | null) {
    return onChangeSelectedDate && onChangeSelectedDate(date)
  }
  
  function setSingleDate (value: Date) {
    calendarProvider.resetSelectedDates()
    calendarProvider.addSelectedDate(value)
    emitSelectedDateEvent(value)
  }
  
  function setMultipleDate (value: Date) {
    const pickLimit = bind?.props?.pickLimit || defaultProps.pickLimit
    if (calendarProvider.selectedDates.length < pickLimit) {
      calendarProvider.addSelectedDate(value)
      emitSelectedDateEvent(dateSort(...calendarProvider.selectedDates))
    }
  }

  function setRangeDate (value: Date) {
    const { selectedDates } = calendarProvider
    const rangeSize = bind?.props?.rangeSize || defaultProps.rangeSize

    switch (calendarProvider.selectedDates.length) {
      case 0: {
        calendarProvider.addSelectedDate(value)
        break
      }
      case 1: {
        const rangeDiff = dateDiff(selectedDates[0], value)
        const rangeDiffAbs = Math.abs(rangeDiff)
        const datesRange = getDatesRange(selectedDates[0], value)
        const isValid = !filterInvalidDates || (
          datesRange.filter(date => filterInvalidDates(date)).length === 0
        )

        if (isValid && (rangeDiffAbs >= rangeSize.min && rangeDiffAbs <= rangeSize.max)) {
          calendarProvider.addSelectedDate(value)
          break
        }
      }
      case 2: return
    }

    emitSelectedDateEvent(dateSort(...calendarProvider.selectedDates))
  }

  function addSelectedDateHandler (date: Date) {
    const pick = bind?.props?.pick || defaultProps.pick
    const methods = {
      single: setSingleDate,
      multiple: setMultipleDate,
      range: setRangeDate,
    }

    methods[pick](date)
  }

  function removeSelectedDate (value: Date) {
    const pick = bind?.props?.pick || defaultProps.pick

    const formattedDates = calendarProvider.selectedDates.map(d =>
      d.toLocaleDateString()
    )
    calendarProvider.removeSelectedDate(
      formattedDates.indexOf(value.toLocaleDateString())
    )

    if (pick === 'single') {
      emitSelectedDateEvent(null)
    } else {
      emitSelectedDateEvent(dateSort(...calendarProvider.selectedDates))
    }
  }

  const events: TEvents = {
    'calendar.prevMonth': calendarProvider.prevMonth,
    'calendar.nextMonth': calendarProvider.nextMonth,
    'calendar.prevYear': calendarProvider.prevYear,
    'calendar.nextYear': calendarProvider.nextYear,
    'calendar.prevYears': calendarProvider.prevYears,
    'calendar.nextYears': calendarProvider.nextYears,
    'calendar.goto': calendarProvider.goto,
    'calendar.addSelectedDate': addSelectedDateHandler,
    'calendar.removeSelectedDate': removeSelectedDate,
    'setDateMouseOver': setDateMouseOver,
    'setDataToView': setDataToView
  }

  return (eventType, ...eventValue) => events[eventType](...eventValue)
}
