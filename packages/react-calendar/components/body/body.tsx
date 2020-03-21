import React, { useContext } from 'react'
import { CalendarContext } from '../../context'
import { defaultMonthsDictionary, defaultRangeSize } from '../../shared/defaultProps'
import compareDates from '../../utils/compare-dates'
import dateIncludes from '../../utils/date-includes'
import getPickRangeClassNames from './pick-range-classNames'

function Days () {
  const {
    calendarProvider,
    endDateMouseOver,
    emit,
    CalendarProps: {
      pick,
      bind,
      classNames,
      dateProps,
      filterInValidDates,
      rangeSize = defaultRangeSize,
    },
  } = useContext(CalendarContext)
  const { days } = calendarProvider
  const { className, onClick, onMouseEnter, onMouseLeave, ...restProps } = dateProps || {}
  const { selectedDates } = calendarProvider

  const _pick = bind?.pick || pick
  const _filterInvalidDates = bind?.filterInvalidDates || filterInValidDates

  return (
    <>
      {days.map(({ date, day, belongCurrentMonth }) => {
        const isCurrentDate = compareDates(date, new Date())
        const isSelectedDate = dateIncludes(selectedDates, date)
        const isInvalidDate = _filterInvalidDates ? _filterInvalidDates(date) : false
        const isPickRange = _pick === 'range'

        const pickRangeClassNames = isPickRange ? getPickRangeClassNames({
          selectedDates,
          endDateMouseOver,
          date,
          rangeSize: bind?.rangeSize || rangeSize,
          isInvalidDate,
          classNames
        }) : []

        const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isSelectedDate) {
            emit('calendar.removeSelectedDate', date)
            if (isPickRange) {
              emit('setEndDateMouseOver', date)
            }
          } else if (belongCurrentMonth && !isInvalidDate) {
            emit('calendar.addSelectedDate', date)
          }

          if (onClick) onClick(e)
        }

        const mouseEnterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isPickRange && belongCurrentMonth && selectedDates.length === 1) {
            emit('setEndDateMouseOver', date)
          }
          if (onMouseEnter) onMouseEnter(e)
        }

        const mouseLeaveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (isPickRange) {
            emit('setEndDateMouseOver', null)
          }
          if (onMouseLeave) onMouseLeave(e)
        }

        return (
          <button
            key={day+belongCurrentMonth.toString()}
            type="button"
            className={[
              className,
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
            {...restProps}
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
      dateProps,
      monthsDictionary = defaultMonthsDictionary,
    },
  } = useContext(CalendarContext)
  const { months } = calendarProvider

  return (
    <>
      {months.map(({ date, month }) => {
        const { className, onClick, ...restProps } = dateProps || {}
        const currentDate = new Date()
        const dateString = `${date.getMonth()}${date.getFullYear()}`
        const currentDateString = `${currentDate.getMonth()}${currentDate.getFullYear()}`

        const clonedSelectedDates = calendarProvider.selectedDates.map(_date => {
          const clonedDate = new Date(_date)
          clonedDate.setDate(1)
          return clonedDate
        })

        return (
          <button
            key={month}
            type="button"
            className={[
              className,
              classNames?.Cell,
              classNames?.MonthCell,
              dateString === currentDateString && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].filter(Boolean).join(' ')}
            onClick={() => {
              emit('calendar.goto', date)
              emit('setDataToView', 'days')
              if (onClick) onClick()
            }}
            {...restProps}
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
      dateProps,
    },
  } = useContext(CalendarContext)
  const { years } = calendarProvider

  return (
    <>
      {years.map(({ date, year }) => {
        const { className, onClick, ...restProps } = dateProps || {}
        const currentDate = new Date()

        const clonedSelectedDates = calendarProvider.selectedDates.map(_date => {
          const clonedDate = new Date(_date)
          clonedDate.setDate(1)
          return clonedDate
        })

        return (
          <button
            key={year}
            type="button"
            className={[
              className,
              classNames?.Cell,
              classNames?.YearCell,
              date.getFullYear() === currentDate.getFullYear() && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].join(' ')}
            onClick={() => {
              emit('calendar.goto', date)
              emit('setDataToView', 'months')
              if (onClick) onClick()
            }}
            {...restProps}
          >
            {year}
          </button>
        )
      })}
    </>
  )
}

export default function Body () {
  const { dataToView, CalendarProps: { classNames } } = useContext(CalendarContext)

  return (
    <div className={classNames?.Body}>
      {dataToView === 'days' && <Days />}
      {dataToView === 'months' && <Months />}
      {dataToView === 'years' && <Years />}
    </div>
  )
}
