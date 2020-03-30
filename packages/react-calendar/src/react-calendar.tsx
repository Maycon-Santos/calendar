import React, { useMemo, useState } from 'react'
import CalendarProvider from '../../calendar-provider/src/calendar-provider'
import Body from './components/body'
import Header from './components/header'
import { CalendarContext } from './context'
import useBindConsumer from './hooks/use-bind-consumer'
import useDispatcher from './hooks/use-dispatcher'
import useForceUpdate from './hooks/use-force-update'
import useWillMount from './hooks/use-will-mount'
import { CalendarProps, DataToView, EventDispatcher } from './shared-types'

export default (props: CalendarProps) => {
  const {
    classNames,
    startDate,
  } = props
  
  const [dataToView, setDataToView] = useState<DataToView>('days')
  const [dateMouseOver, setDateMouseOver] = useState<Date | null>(null)
  const calendarProvider = useMemo(() => new CalendarProvider({ date: startDate }), [])
  const bind = useBindConsumer({
    props,
    shared: {
      mainCalendarProvider: calendarProvider,
      dispatchers: []
    }
  })

  const dispatcher = useDispatcher({
    bind,
    calendarProvider,
    setDateMouseOver,
    setDataToView,
  })

  const emitEvent: EventDispatcher = (type, ...params) => {
    const dispatchers = bind.shared?.dispatchers || [dispatcher]
    dispatchers.forEach(dispatcher => dispatcher(type, ...params))
  }

  useWillMount(() => bind.order && dispatcher('setDataToView', dataToView))

  calendarProvider.onChange = useForceUpdate()

  return (
    <CalendarContext.Provider
      value={{
        emitEvent,
        dataToView,
        calendarProvider,
        dateMouseOver,
        bind,
      }}>
      <div className={classNames?.Container}>
        <Header />
        <Body />
      </div>
    </CalendarContext.Provider>
  )
}
