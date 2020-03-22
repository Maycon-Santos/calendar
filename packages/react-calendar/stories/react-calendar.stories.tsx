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
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar classNames={classNames} pick="single" onChangeSelectedDate={console.log} bind={bind} />
      <Calendar classNames={classNames} bind={bind} />
    </div>
  )
}
