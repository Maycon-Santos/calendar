import React, { useContext } from 'react'
import { CalendarContext } from "../context"
import defaultProps from '../defaultProps'
import onClickHandler from '../utils/onclick-handler'

interface IButtonProps {
  onClick: () => void
}

interface IHeaderTextProps {
  children: React.ReactNode
  onClick?: () => void
}

function PrevButton (props: IButtonProps) {
  const { onClick } = props
  const {
    CalendarProps: {
      classNames,
      PrevButtonProps,
    },
  } = useContext(CalendarContext)
  
  return (
    <button
      {...PrevButtonProps}
      type="button"
      onClick={onClickHandler(onClick, PrevButtonProps?.onClick)}
      className={[
        PrevButtonProps?.className,
        classNames?.PrevButton
      ].filter(Boolean).join(' ')}
    />
  )
}

function NextButton (props: IButtonProps) {
  const { onClick } = props
  const {
    CalendarProps: {
      classNames,
      NextButtonProps,
    },
  } = useContext(CalendarContext)
  return (
    <button
      {...NextButtonProps}
      type="button"
      onClick={onClickHandler(onClick, NextButtonProps?.onClick)}
      className={[
        NextButtonProps?.className,
        classNames?.NextButton
      ].filter(Boolean).join(' ')}
    />
  )
}

function HeaderText (props: IHeaderTextProps) {
  const { children, onClick } = props
  const {
    CalendarProps: {
      classNames,
      HeaderTextProps,
    },
  } = useContext(CalendarContext)

  return (
    <button
      {...HeaderTextProps}
      type="button"
      onClick={onClickHandler(onClick, HeaderTextProps?.onClick)}
      className={[
        HeaderTextProps?.className,
        classNames?.HeaderText
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}

function Month () {
  const {
    emit,
    calendarProvider,
    CalendarProps: {
      monthsDictionary = defaultProps.monthsDictionary,
    },
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
      HeaderProps,
    }
  } = useContext(CalendarContext)

  return (
    <header
      className={[
        HeaderProps?.className,
        classNames?.Header,
        dataToView === 'days' && classNames?.HeaderMonth,
        dataToView === 'months' && classNames?.HeaderYear,
        dataToView === 'years' && classNames?.HeaderYearsRange,
      ].filter(Boolean).join(' ')}
      {...HeaderProps}
    >
      {dataToView === 'days' && <Month />}
      {dataToView === 'months' && <Year />}
      {dataToView === 'years' && <YearsRange />}
    </header>
  )
}
