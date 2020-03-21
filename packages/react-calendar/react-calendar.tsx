import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CalendarProvider from '../calendar-provider/calendar-provider'
import { CalendarContext } from './context'
import Body from './components/body'
import Header from './components/header'
import dateDiff from './utils/date-diff'
import {
  ICalendarProps,
  TDataToView,
  TEventParams,
  TEventType
} from './shared/types'
import { defaultRangeSize } from './shared/defaultProps'

export default (props: ICalendarProps) => {
  const {
    classNames,
    pick,
    pickLimit = Infinity,
    bind,
    startDate = new Date(),
    rangeSize = defaultRangeSize,
    filterInValidDates
  } = props
  const [, forceUpdate] = useState()
  const [order, setOrder] = useState<number>()
  const [dataToView, setDataToView] = useState<TDataToView>('days')
  const [endDateMouseOver, setEndDateMouseOver] = useState<Date | null>(null)
  const backwardYears = 8
  const forwardYears = 8
  const calendarProvider = useMemo(
    () =>
      new CalendarProvider({ date: startDate, backwardYears, forwardYears }),
    []
  )

  calendarProvider.onChange = useCallback(() => forceUpdate({}), [])

  useEffect(binder, [bind])
  useEffect(bindHandler, [dataToView, order])

  function binder() {
    if (bind) {
      const order = bind.set.length
      bind.set.push(dispatcher)

      if (order === 0) {
        bind.mainCalendarProvider = calendarProvider
        bind.pick = pick
        bind.pickLimit = pickLimit
        bind.rangeSize = rangeSize
        bind.filterInvalidDates = filterInValidDates
      }

      setOrder(order)
    }
  }

  function bindHandler() {
    if (!bind || !order || !bind?.mainCalendarProvider) return

    const { mainCalendarProvider } = bind
    const date = new Date(mainCalendarProvider.dateToView)

    if (dataToView === 'days') {
      date.setMonth(date.getMonth() + order)
      calendarProvider.goto(date)
    }

    if (dataToView === 'months') {
      date.setFullYear(date.getFullYear() + order)
      calendarProvider.goto(date)
    }

    if (dataToView === 'years') {
      const years = mainCalendarProvider.years
      date.setFullYear(
        years[backwardYears].date.getFullYear() +
          (backwardYears + forwardYears) * order
      )
      calendarProvider.goto(date)
    }
  }

  function dispatcher(type: TEventType, params?: TEventParams) {
    switch (type) {
      case 'calendar.prevMonth':
        calendarProvider.prevMonth()
        break
      case 'calendar.nextMonth':
        calendarProvider.nextMonth()
        break
      case 'calendar.prevYear':
        calendarProvider.prevYear()
        break
      case 'calendar.nextYear':
        calendarProvider.nextYear()
        break
      case 'calendar.prevYears':
        calendarProvider.prevYears()
        break
      case 'calendar.nextYears':
        calendarProvider.nextYears()
        break
      case 'calendar.goto':
        if (params instanceof Date) {
          calendarProvider.goto(params)
        }
        break
      case 'calendar.addSelectedDate':
        if (params instanceof Date) {
          const _pickLimit = bind?.pickLimit || pickLimit
          const _pick = bind?.pick || pick

          if (_pick === 'single') {
            calendarProvider.resetSelectedDates()
            calendarProvider.addSelectedDate(params)
          }

          if (_pick === 'multiple') {
            if (calendarProvider.selectedDates.length < _pickLimit) {
              calendarProvider.addSelectedDate(params)
            }
          }

          if (_pick === 'range') {
            const { selectedDates } = calendarProvider
            if (calendarProvider.selectedDates.length === 0) {
              calendarProvider.addSelectedDate(params)
            } else if (calendarProvider.selectedDates.length === 1) {
              const rangeDiff = dateDiff(selectedDates[0], params)
              const rangeDiffAbs = Math.abs(rangeDiff)
              const _rangeSize = bind?.rangeSize || rangeSize

              if (filterInValidDates) {
                const date = new Date(selectedDates[0])
                for (let i = 0; i < rangeDiffAbs; i++) {
                  date.setDate(date.getDate() + rangeDiff / rangeDiffAbs)
                  if (filterInValidDates(date)) return
                }
              }

              if (
                rangeDiffAbs >= _rangeSize.min &&
                rangeDiffAbs <= _rangeSize.max
              ) {
                calendarProvider.addSelectedDate(params)
              }
            }
          }
        }
        break
      case 'calendar.removeSelectedDate':
        if (params instanceof Date) {
          const formattedDates = calendarProvider.selectedDates.map(d =>
            d.toLocaleDateString()
          )
          calendarProvider.removeSelectedDate(
            formattedDates.indexOf(params.toLocaleDateString())
          )
        }
        break
      case 'setEndDateMouseOver':
        if (params instanceof Date || params === null) {
          setEndDateMouseOver(params)
        }
        break
      case 'setDataToView':
        if (typeof params === 'string') {
          setDataToView(params)
        }
        break
    }
  }

  function emit(type: TEventType, params?: TEventParams) {
    const dispatchers = bind?.set || [dispatcher]
    dispatchers.forEach(dispatcher => dispatcher(type, params))
  }

  return (
    <CalendarContext.Provider
      value={{
        dataToView,
        calendarProvider,
        emit,
        endDateMouseOver,
        CalendarProps: {
          ...props,
          pickLimit,
          startDate,
          rangeSize
        }
      }}>
      <div className={classNames?.Container}>
        <Header />
        <Body />
      </div>
    </CalendarContext.Provider>
  )
}
