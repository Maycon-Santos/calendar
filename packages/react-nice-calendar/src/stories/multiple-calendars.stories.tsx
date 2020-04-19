import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import Calendar from '../export/calendar'
import useCalendarBind from '../hooks/use-calendar-bind'
import styles from './styles/wrapper.css'
import './styles/font-face.css'

export default {
  title: 'Multiple calendars',
  component: Calendar
}

const actionSelectedDate = action('selected date')
const actionSelectedDates = action('selected dates')
const datesToLocaleString = (dates: Date[]) =>
  dates.map(d => d.toLocaleDateString())

export const pick_single_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick='single'
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
      <Calendar bind={bind} />
    </div>
  )
}

export const pick_multiple_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([])
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick='multiple'
        pickLimit={5}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
        bind={bind}
      />
      <Calendar bind={bind} />
    </div>
  )
}

export const pick_range_with_bind = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>()
  const bind = useCalendarBind()

  return (
    <div className={styles.Container}>
      <Calendar
        pick='range'
        rangeSize={{
          min: 4,
          max: 10
        }}
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates: Date[]) => {
          setSelectedDate(dates)
          actionSelectedDates(...datesToLocaleString(dates))
        }}
        bind={bind}
      />
      <Calendar bind={bind} />
    </div>
  )
}
