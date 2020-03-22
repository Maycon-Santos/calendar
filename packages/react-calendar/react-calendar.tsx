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
  const [order, setOrder] = useState<number>(0)
  const [dataToView, setDataToView] = useState<TDataToView>('days')
  const [dateMouseOver, setDateMouseOver] = useState<Date | null>(null)
  const calendarProvider = useMemo(() => new CalendarProvider({ date: startDate }), [])

  calendarProvider.onChange = useCallback(() => forceUpdate({}), [])

  useEffect(connector, [])
  useEffect(setCorrectlyDataToView, [order])

  // Update bind
  if (bind) {
    if (order === 0) {
      bind.mainCalendarProvider = calendarProvider
      Object.assign(bind.props, props)
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
    dispatchers.forEach((dispatcher, i) => {
      if (bind) bind.order = i
      dispatcher(type, ...params)
    })
  }

  function connector() {
    if (bind) {
      const order = bind.dispatchers.length
      bind.dispatchers.push(dispatcher)
      bind.order = order

      if (order === 0) {
        Object.assign(bind.props, props)
        bind.mainCalendarProvider = calendarProvider
      }
      
      setOrder(order)
    }
  }

  function setCorrectlyDataToView () {
    if (order) dispatcher('setDataToView', dataToView)
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
