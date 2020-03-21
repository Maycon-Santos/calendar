import React from 'react'
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
  const calendarBind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        classNames={classNames}
        bind={calendarBind}
        pick="range"
        rangeSize={{ min: 4, max: 9 }}
        startDate={new Date(2021, 7)}
      />
      <Calendar
        classNames={classNames}
        bind={calendarBind}
      />
    </div>
  )
}
