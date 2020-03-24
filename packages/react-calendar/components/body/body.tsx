import React, { useContext } from 'react'
import { CalendarContext } from '../../context'
import defaultProps from '../../defaultProps'
import compareDates from '../../utils/compare-dates'
import dateIncludes from '../../utils/date-includes'
import getSelectedDates from '../../utils/selected-dates'
import getPickRangeClassNames from './pick-range-classnames'
import onClickHandler from '../../utils/onclick-handler'

function Days () {
  const {
    calendarProvider,
    dateMouseOver,
    emit,
    CalendarProps,
    CalendarProps: {
      bind,
      classNames,
      rangeSize = defaultProps.rangeSize,
      DateProps,
    },
  } = useContext(CalendarContext)
  const { days } = calendarProvider
  const props = bind?.props || CalendarProps
  const selectedDates = getSelectedDates(props.selectedDate)
  const filterInvalidDates = props.filterInvalidDates

  return (
    <>
      {days.map(({ date, day, belongCurrentMonth }) => {
        const isCurrentDate = compareDates(date, new Date())
        const isSelectedDate = dateIncludes(selectedDates, date)
        const isInvalidDate = filterInvalidDates ? filterInvalidDates(date) : false
        const isPickRange = props.pick === 'range'

        const pickRangeClassNames = isPickRange ? getPickRangeClassNames({
          selectedDates,
          dateMouseOver,
          date,
          rangeSize: props.rangeSize || rangeSize,
          isInvalidDate,
          classNames,
        }) : []

        const clickHandler = () => {
          if (isSelectedDate) {
            emit('calendar.removeSelectedDate', date)
            if (isPickRange) {
              emit('setDateMouseOver', date)
            }
          } else if (belongCurrentMonth && !isInvalidDate) {
            emit('calendar.addSelectedDate', date)
          }
        }

        const mouseEnterHandler = () => {
          if (isPickRange && belongCurrentMonth && selectedDates.length === 1) {
            emit('setDateMouseOver', date)
          }
        }

        const mouseLeaveHandler = () => {
          if (isPickRange) {
            emit('setDateMouseOver', null)
          }
        }

        return (
          <button
            {...DateProps}
            key={day + belongCurrentMonth.toString()}
            type="button"
            className={[
              DateProps?.className,
              classNames?.Cell,
              classNames?.DayCell,
              isInvalidDate ? classNames?.InvalidDate : classNames?.ValidDate,
              belongCurrentMonth && classNames?.DayBelongCurrentMonth,
              isCurrentDate      && classNames?.CurrentDate,
              isSelectedDate     && classNames?.SelectedDate,
              ...pickRangeClassNames
            ].filter(Boolean).join(' ')}
            onClick={onClickHandler(clickHandler, DateProps?.onClick)}
            onMouseEnter={onClickHandler(mouseEnterHandler, DateProps?.onClick)}
            onMouseLeave={onClickHandler(mouseLeaveHandler, DateProps?.onClick)}
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
    CalendarProps,
    CalendarProps: {
      classNames,
      bind,
      monthsDictionary = defaultProps.monthsDictionary,
      MonthProps,
    },
  } = useContext(CalendarContext)
  const { months } = calendarProvider
  const props = bind?.props || CalendarProps
  const selectedDates = getSelectedDates(props.selectedDate)

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

        const clickHandler = () => {
          emit('calendar.goto', date)
          emit('setDataToView', 'days')
        }

        return (
          <button
            {...MonthProps}
            key={month}
            type="button"
            className={[
              MonthProps?.className,
              classNames?.Cell,
              classNames?.MonthCell,
              dateString === currentDateString && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].filter(Boolean).join(' ')}
            onClick={onClickHandler(clickHandler, MonthProps?.onClick)}
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
    CalendarProps,
    CalendarProps: {
      classNames,
      YearProps,
      bind,
    },
  } = useContext(CalendarContext)
  const { years } = calendarProvider
  const props = bind?.props || CalendarProps
  const selectedDates = getSelectedDates(props.selectedDate)

  return (
    <>
      {years.map(({ date, year }) => {
        const currentDate = new Date()

        const clonedSelectedDates = selectedDates.map(_date => {
          const clonedDate = new Date(_date)
          clonedDate.setDate(1)
          clonedDate.setMonth(0)
          return clonedDate
        })

        const clickHandler = () => {
          emit('calendar.goto', date)
          emit('setDataToView', 'months')
        }

        return (
          <button
            key={year}
            type="button"
            className={[
              YearProps?.className,
              classNames?.Cell,
              classNames?.YearCell,
              date.getFullYear() === currentDate.getFullYear() && classNames?.CurrentDate,
              dateIncludes(clonedSelectedDates, date) && classNames?.SelectedDate,
            ].join(' ')}
            onClick={onClickHandler(clickHandler, YearProps?.onClick)}
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
      daysDictionary = defaultProps.daysDictionary,
      BodyProps,
      DaysProps,
      DayProps,
    },
  } = useContext(CalendarContext)

  onClickHandler

  return (
    <>
      {dataToView === 'days' && (
        <div
          {...DaysProps}
          className={[
            DaysProps?.className,
            classNames?.Days
          ].filter(Boolean).join(' ')}
        >
          {daysDictionary.map((day, i) => (
            <div
              {...DayProps}
              key={day + i}
              className={[
                DayProps?.className,
                classNames?.Day
              ].filter(Boolean).join(' ')}
            >
              {day}
            </div>
          ))}
        </div>
      )}
      <div
        {...BodyProps}
        className={[
          BodyProps?.className,
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
