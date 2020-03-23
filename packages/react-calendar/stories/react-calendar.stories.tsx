import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import Calendar from '../react-calendar'
import useCalendarBind from '../hooks/use-calendar-bind'
import styles from './styles/wrapper.css'
import classNames from './styles/calendar.css'
import './styles/font-face.css'

export default {
  title: 'Calendar',
  component: Calendar
}

const actionSelectedDate = action('selected date')
const actionSelectedDates = action('selected dates')
const datesToLocaleString = (dates: Date[]) => dates.map(d => d.toLocaleDateString())

export const single = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="single"
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(date: Date | null) => {
          setSelectedDate(date)
          if (date) {
            actionSelectedDate(...datesToLocaleString([date]))
          } else {
            actionSelectedDate(date)
          }
        }}
      />
    </div>
  )
}

export const multiple = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([])

  return (
    <div className={styles.Container}>
      <Calendar
        pick="multiple"
        pickLimit={5}
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
      />
    </div>
  )
}

export const range = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="range"
        rangeSize={{
          min: 4,
          max: 10,
        }}
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
      />
    </div>
  )
}

export const single_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="single"
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(date: Date | null) => {
          setSelectedDate(date)
          if (date) {
            actionSelectedDate(...datesToLocaleString([date]))
          } else {
            actionSelectedDate(date)
          }
        }}
        bind={bind}
      />
      <Calendar classNames={classNames} bind={bind} />
    </div>
  )
}

export const multiple_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([])
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="multiple"
        pickLimit={5}
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
        bind={bind}
      />
      <Calendar classNames={classNames} bind={bind} />
    </div>
  )
}

export const range_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>()
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick="range"
        rangeSize={{
          min: 4,
          max: 10,
        }}
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
        bind={bind}
      />
      <Calendar classNames={classNames} bind={bind} />
    </div>
  )
}
