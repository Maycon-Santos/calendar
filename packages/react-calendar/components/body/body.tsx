import React, { useContext } from 'react'
import { CalendarContext } from '../../context'
import defaultProps from '../../defaultProps'
import compareDates from '../../utils/compare-dates'
import dateIncludes from '../../utils/date-includes'
import getSelectedDates from '../../utils/selected-dates'
import getPickRangeClassNames from './pick-range-classnames'

function Days () {
  const {
    calendarProvider,
    dateMouseOver,
    emit,
    CalendarProps: {
      bind,
      classNames,
      rangeSize = defaultProps.rangeSize,
    },
  } = useContext(CalendarContext)
  const { days } = calendarProvider
  const selectedDates = getSelectedDates(bind?.props?.selectedDate)
  const filterInvalidDates = bind?.props?.filterInvalidDates

  return (
    <>
      {days.map(({ date, day, belongCurrentMonth }) => {
        const isCurrentDate = compareDates(date, new Date())
        const isSelectedDate = dateIncludes(selectedDates, date)
        const isInvalidDate = filterInvalidDates ? filterInvalidDates(date) : false
        const isPickRange = bind?.props?.pick === 'range'

        const pickRangeClassNames = isPickRange ? getPickRangeClassNames({
          selectedDates,
          dateMouseOver,
          date,
          rangeSize: bind?.props.rangeSize || rangeSize,
          isInvalidDate,
          classNames
        }) : []

        const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isSelectedDate) {
            emit('calendar.removeSelectedDate', date)
            if (isPickRange) {
              emit('setDateMouseOver', date)
            }
          } else if (belongCurrentMonth && !isInvalidDate) {
            emit('calendar.addSelectedDate', date)
          }
        }

        const mouseEnterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isPickRange && belongCurrentMonth && selectedDates.length === 1) {
            emit('setDateMouseOver', date)
          }
        }

        const mouseLeaveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isPickRange) {
            emit('setDateMouseOver', null)
          }
        }

        return (
          <button
            key={day+belongCurrentMonth.toString()}
            type="button"
            className={[
              classNames?.Cell,
              classNames?.DayCell,
              isInvalidDate ? classNames?.InvalidDate : classNames?.ValidDate,
              belongCurrentMonth && classNames?.DayBelongCurrentMonth,
              isCurrentDate      && classNames?.CurrentDate,
              isSelectedDate     && classNames?.SelectedDate,
              ...pickRangeClassNames
            ].filter(Boolean).join(' ')}
            onClick={clickHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            {day}
          </button>
        )
      })}
    </>
  )
}

function Months () {
  const {
    calendarProvider,
    emit,
    CalendarProps: {
      classNames,
      bind,
      monthsDictionary = defaultProps.monthsDictionary,
    },
  } = useContext(CalendarContext)
  const { months } = calendarProvider
  const selectedDates = getSelectedDates(bind?.props?.selectedDate)

  return (
    <>
      {months.map(({ date, month }) => {
        const currentDate = new Date()
        const dateString = `${date.getMonth()}${date.getFullYear()}`
        const currentDateString = `${currentDate.getMonth()}${currentDate.getFullYear()}`

        const clonedSelectedDates = selectedDates.map(_date => {
          const clonedDate = new Date(_date)
          clonedDate.setDate(1)
          return clonedDate
        })

        return (
          <button
            key={month}
            type="button"
            className={[
              classNames?.Cell,
              classNames?.MonthCell,
              dateString === currentDateString && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].filter(Boolean).join(' ')}
            onClick={() => {
              emit('calendar.goto', date)
              emit('setDataToView', 'days')
            }}
          >
            {monthsDictionary[month]}
          </button>
        )
      })}
    </>
  )
}

function Years () {
  const {
    calendarProvider,
    emit,
    CalendarProps: {
      classNames,
      bind,
    },
  } = useContext(CalendarContext)
  const { years } = calendarProvider
  const selectedDates = getSelectedDates(bind?.props?.selectedDate)

  return (
    <>
      {years.map(({ date, year }) => {
        const currentDate = new Date()

        const clonedSelectedDates = selectedDates.map(_date => {
          const clonedDate = new Date(_date)
          clonedDate.setDate(1)
          return clonedDate
        })

        return (
          <button
            key={year}
            type="button"
            className={[
              classNames?.Cell,
              classNames?.YearCell,
              date.getFullYear() === currentDate.getFullYear() && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].join(' ')}
            onClick={() => {
              emit('calendar.goto', date)
              emit('setDataToView', 'months')
            }}
          >
            {year}
          </button>
        )
      })}
    </>
  )
}

export default function Body () {
  const {
    dataToView,
    CalendarProps: {
      classNames,
      daysDictionary = defaultProps.daysDictionary
    }
  } = useContext(CalendarContext)

  return (
    <>
      {dataToView === 'days' && (
        <div className={classNames?.Days}>
          {daysDictionary.map((day, i) => (
            <div key={day + i}className={classNames?.Day}>
              {day}
            </div>
          ))}
        </div>
      )}
      <div
        className={[
          classNames?.Body,
          dataToView === 'days' && classNames?.BodyDays,
          dataToView === 'months' && classNames?.BodyMonths,
          dataToView === 'years' && classNames?.BodyYears,
        ].filter(Boolean).join(' ')}
      >
        {dataToView === 'days' && <Days />}
        {dataToView === 'months' && <Months />}
        {dataToView === 'years' && <Years />}
      </div>
    </>
  )
}
