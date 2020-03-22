import React, { useState } from 'react'
import Calendar from '../react-calendar'
import useCalendarBind from '../hooks/use-calendar-bind'
import styles from './styles/wrapper.css'
import classNames from './styles/calendar.css'
import './styles/font-face.css'

export default {
  title: 'Calendar',
  component: Calendar
}

export const initial = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([])
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="range"
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
        bind={bind}
      />
      <Calendar classNames={classNames} bind={bind} />
    </div>
  )
}
