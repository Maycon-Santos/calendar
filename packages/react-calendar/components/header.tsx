import React, { useContext } from 'react'
import { CalendarContext } from "../context"
import customOnClick from '../utils/onclick-handler'
import classNameResolve from '../utils/classname-resolve'
import useProps from '../hooks/use-props'

interface ButtonProps {
  onClick: () => void
}

interface HeaderTextProps {
  children: React.ReactNode
  onClick?: () => void
}

function PrevButton (props: ButtonProps) {
  const { onClick } = props

  const {
    classNames,
    PrevButtonProps,
  } = useProps()
  
  return (
    <button
      {...PrevButtonProps}
      type="button"
      onClick={customOnClick(onClick, PrevButtonProps?.onClick)}
      className={classNameResolve(
        PrevButtonProps?.className,
        classNames?.PrevButton
      )}
    />
  )
}

function NextButton (props: ButtonProps) {
  const { onClick } = props

  const {
    classNames,
    NextButtonProps,
  } = useProps()

  return (
    <button
      {...NextButtonProps}
      type="button"
      onClick={customOnClick(onClick, NextButtonProps?.onClick)}
      className={classNameResolve(
        NextButtonProps?.className,
        classNames?.NextButton
      )}
    />
  )
}

function HeaderText (props: HeaderTextProps) {
  const { children, onClick } = props

  const {
    classNames,
    HeaderTextProps,
  } = useProps()

  return (
    <button
      {...HeaderTextProps}
      type="button"
      onClick={customOnClick(onClick, HeaderTextProps?.onClick)}
      className={classNameResolve(
        HeaderTextProps?.className,
        classNames?.HeaderText
      )}
    >
      {children}
    </button>
  )
}

function Month () {
  const {
    emit,
    calendarProvider
  } = useContext(CalendarContext)

  const {
    monthsDictionary,
  } = useProps()

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
  } = useContext(CalendarContext)

  const {
    classNames,
    HeaderProps,
  } = useProps()

  return (
    <header
      className={classNameResolve(
        HeaderProps?.className,
        classNames?.Header,
        dataToView === 'days' && classNames?.HeaderMonth,
        dataToView === 'months' && classNames?.HeaderYear,
        dataToView === 'years' && classNames?.HeaderYearsRange,
      )}
      {...HeaderProps}
    >
      {dataToView === 'days' && <Month />}
      {dataToView === 'months' && <Year />}
      {dataToView === 'years' && <YearsRange />}
    </header>
  )
}
