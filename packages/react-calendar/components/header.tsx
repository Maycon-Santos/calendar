import React, { useContext } from 'react'
import { CalendarContext } from "../context"
import { defaultMonthsDictionary, defaultDaysDictionary } from '../shared/defaultProps'

interface IButtonProps {
  onClick: () => void
}

interface IHeaderTextProps {
  children: React.ReactNode
  onClick?: () => void
}

function PrevButton (props: IButtonProps) {
  const { onClick } = props
  const { CalendarProps: { classNames } } = useContext(CalendarContext)
  return (
    <button type="button" onClick={onClick} className={classNames?.PrevButton} />
  )
}

function NextButton (props: IButtonProps) {
  const { onClick } = props
  const { CalendarProps: { classNames } } = useContext(CalendarContext)
  return (
    <button type="button" onClick={onClick} className={classNames?.NextButton} />
  )
}

function HeaderText (props: IHeaderTextProps) {
  const { children, onClick } = props
  const { CalendarProps: { classNames } } = useContext(CalendarContext)
  return (
    <button type="button" onClick={onClick} className={classNames?.HeaderText}>
      {children}
    </button>
  )
}

function Month () {
  const {
    emit,
    calendarProvider,
    CalendarProps: {
      monthsDictionary = defaultMonthsDictionary
    }
  } = useContext(CalendarContext)
  return (
    <>
      <PrevButton onClick={() => emit('calendar.prevMonth')} />
      <HeaderText onClick={() => emit('setDataToView', 'months')}>
        {monthsDictionary[calendarProvider.month]} - {calendarProvider.year}
      </HeaderText>
      <NextButton onClick={() => emit('calendar.nextMonth')} />
    </>
  )
}

function Year () {
  const {
    emit,
    calendarProvider
  } = useContext(CalendarContext)
  return (
    <>
      <PrevButton onClick={() => emit('calendar.prevYear')} />
      <HeaderText onClick={() => emit('setDataToView', 'years')}>{calendarProvider.year}</HeaderText>
      <NextButton onClick={() => emit('calendar.nextYear')} />
    </>
  )
}

function YearsRange () {
  const {
    calendarProvider,
    emit
  } = useContext(CalendarContext)
  const { years } = calendarProvider
  return (
    <>
      <PrevButton onClick={() => emit('calendar.prevYears')} />
      <HeaderText>{years[0].year} - {years[years.length - 1].year}</HeaderText>
      <NextButton onClick={() => emit('calendar.nextYears')} />
    </>
  )
}

export default function Header () {
  const {
    dataToView,
    CalendarProps: {
      classNames,
      daysDictionary = defaultDaysDictionary
    }
  } = useContext(CalendarContext)

  return (
    <>
      <header
        className={[
          classNames?.Header,
          dataToView === 'days' && classNames?.Month,
          dataToView === 'months' && classNames?.Year,
          dataToView === 'years' && classNames?.YearsRange,
        ].filter(Boolean).join(' ')}
      >
        {dataToView === 'days' && <Month />}
        {dataToView === 'months' && <Year />}
        {dataToView === 'years' && <YearsRange />}
      </header>
      {dataToView === 'days' && (
        <div className={classNames?.Days}>
          {daysDictionary.map((day, i) => (
            <div
              key={day + i}
              className={classNames?.Day}
            >
              {day}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
