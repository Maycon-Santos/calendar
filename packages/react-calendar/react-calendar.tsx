import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CalendarProvider from '../calendar-provider/calendar-provider'
import { CalendarContext } from './context'
import Body from './components/body'
import Header from './components/header'
import {
  ICalendarProps,
  TDataToView,
  TEventDispatcher
} from './types'
import defaultProps from './defaultProps'
import dispatcherFactory from './dispatcher-factory'

export default (props: ICalendarProps) => {
  const {
    classNames,
    bind,
    pickLimit = defaultProps.pickLimit,
    startDate = defaultProps.startDate,
    rangeSize = defaultProps.rangeSize,
  } = props
  const [, forceUpdate] = useState()
  const [order, setOrder] = useState<number>()
  const [dataToView, setDataToView] = useState<TDataToView>('days')
  const [dateMouseOver, setDateMouseOver] = useState<Date | null>(null)
  const backwardYears = 8
  const forwardYears = 8
  const calendarProvider = useMemo(
    () =>
      new CalendarProvider({ date: startDate, backwardYears, forwardYears }),
    []
  )

  calendarProvider.onChange = useCallback(() => forceUpdate({}), [])

  useEffect(connector, [bind])
  useEffect(dataToViewHandler, [dataToView, order])

  function connector() {
    if (bind) {
      const order = bind.dispatchers.length
      bind.dispatchers.push(dispatcher)

      if (order === 0) {
        Object.assign(bind.props, props)
        bind.mainCalendarProvider = calendarProvider
      }

      setOrder(order)
    }
  }

  function dataToViewHandler() {
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

  const dispatcher = useMemo(() => dispatcherFactory({
    calendarProvider,
    setDateMouseOver,
    setDataToView,
    props,
  }), [])

  const emit: TEventDispatcher = (type, ...params) => {
    const dispatchers = bind?.dispatchers || [dispatcher]
    dispatchers.forEach(dispatcher => dispatcher(type, ...params))
  }

  return (
    <CalendarContext.Provider
      value={{
        dataToView,
        calendarProvider,
        emit,
        dateMouseOver,
        CalendarProps: {
          ...(props.bind?.props || props),
          classNames,
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
