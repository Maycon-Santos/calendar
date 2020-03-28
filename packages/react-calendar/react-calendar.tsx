import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CalendarProvider from '../calendar-provider/calendar-provider'
import { CalendarContext } from './context'
import Body from './components/body'
import Header from './components/header'
import {
  CalendarProps,
  DataToView,
  EventDispatcher
} from './shared-types'
import dispatcherFactory from './dispatcher-factory'

export default (props: CalendarProps) => {
  const {
    classNames,
    bind,
    startDate,
  } = props
  const [, forceUpdate] = useState()
  const [order, setOrder] = useState<number>(0)
  const [dataToView, setDataToView] = useState<DataToView>('days')
  const [dateMouseOver, setDateMouseOver] = useState<Date | null>(null)
  const calendarProvider = useMemo(() => new CalendarProvider({ date: startDate }), [])
  const bindProps = useMemo(() => ({}), [])

  // Update shared props object
  if (order === 0) Object.assign(bindProps, props)

  calendarProvider.onChange = useCallback(() => forceUpdate({}), [])

  const dispatcher: EventDispatcher = useMemo(() => dispatcherFactory({
    order,
    calendarProvider,
    setDateMouseOver,
    setDataToView,
    props: bindProps,
  }), [order])

  useEffect(connector, [])
  useEffect(setCorrectDataToView, [order])

  // Update dispatcher function in bind object
  useEffect(() => {
    if (bind && order) {
      bind.dispatchers[order] = dispatcher
    }
  }, [dispatcher])

  const emit: EventDispatcher = (type, ...params) => {
    const dispatchers = bind?.dispatchers || [dispatcher]
    dispatchers.forEach(dispatcher => dispatcher(type, ...params))
  }

  function connector() {
    if (bind) {
      const order = bind.dispatchers.length
      bind.dispatchers.push(dispatcher)

      if (order === 0) {
        bind.props = bindProps
        bind.mainCalendarProvider = calendarProvider
      }
      
      setOrder(order)
    }
  }

  function setCorrectDataToView () {
    if (order) dispatcher('setDataToView', dataToView)
  }

  return (
    <CalendarContext.Provider
      value={{
        order,
        dataToView,
        calendarProvider,
        emit,
        dateMouseOver,
        CalendarProps: {
          ...bindProps,
          classNames,
        }
      }}>
      <div className={classNames?.Container}>
        <Header />
        <Body />
      </div>
    </CalendarContext.Provider>
  )
}
