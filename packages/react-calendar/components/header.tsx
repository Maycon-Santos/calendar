import React, { useContext } from 'react'
import { CalendarContext } from "../context"
import defaultProps from '../defaultProps'

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
      monthsDictionary = defaultProps.monthsDictionary
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
      classNames
    }
  } = useContext(CalendarContext)

  return (
    <header
      className={[
        classNames?.Header,
        dataToView === 'days' && classNames?.HeaderMonth,
        dataToView === 'months' && classNames?.HeaderYear,
        dataToView === 'years' && classNames?.HeaderYearsRange,
      ].filter(Boolean).join(' ')}
    >
      {dataToView === 'days' && <Month />}
      {dataToView === 'months' && <Year />}
      {dataToView === 'years' && <YearsRange />}
    </header>
  )
}
