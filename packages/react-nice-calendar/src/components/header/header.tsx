import React, { useContext } from 'react'
import { CalendarContext } from '../../context'
import useProps from '../../hooks/use-props'
import resolveClassName from '../../utils/classname-resolve'
import customEvent from '../../utils/custom-event'

interface ButtonProps {
  onClick: () => void
}

interface HeaderTextProps {
  children: React.ReactNode
  onClick?: () => void
}

function PrevButton (props: ButtonProps) {
  const { onClick } = props
  const { classNames, PrevButtonProps } = useProps()

  return (
    <button
      {...PrevButtonProps}
      type='button'
      onClick={customEvent(onClick, PrevButtonProps?.onClick)}
      className={resolveClassName(
        PrevButtonProps?.className,
        classNames?.PrevButton
      )}
    />
  )
}

function NextButton (props: ButtonProps) {
  const { onClick } = props
  const { classNames, NextButtonProps } = useProps()

  return (
    <button
      {...NextButtonProps}
      type='button'
      onClick={customEvent(onClick, NextButtonProps?.onClick)}
      className={resolveClassName(
        NextButtonProps?.className,
        classNames?.NextButton
      )}
    />
  )
}

function HeaderText (props: HeaderTextProps) {
  const { children, onClick } = props
  const { classNames, HeaderTextProps } = useProps()

  return (
    <button
      {...HeaderTextProps}
      type='button'
      onClick={customEvent(onClick, HeaderTextProps?.onClick)}
      className={resolveClassName(
        HeaderTextProps?.className,
        classNames?.HeaderText
      )}
    >
      {children}
    </button>
  )
}

function Month () {
  const { emitEvent, calendarProvider } = useContext(CalendarContext)
  const { monthsDictionary } = useProps()

  return (
    <>
      <PrevButton onClick={() => emitEvent('calendar.prevMonth')} />
      <HeaderText onClick={() => emitEvent('setDataToView', 'months')}>
        {monthsDictionary[calendarProvider.month]} {calendarProvider.year}
      </HeaderText>
      <NextButton onClick={() => emitEvent('calendar.nextMonth')} />
    </>
  )
}

function Year () {
  const { emitEvent, calendarProvider } = useContext(CalendarContext)
  return (
    <>
      <PrevButton onClick={() => emitEvent('calendar.prevYear')} />
      <HeaderText onClick={() => emitEvent('setDataToView', 'years')}>
        {calendarProvider.year}
      </HeaderText>
      <NextButton onClick={() => emitEvent('calendar.nextYear')} />
    </>
  )
}

function YearsRange () {
  const { calendarProvider, emitEvent } = useContext(CalendarContext)
  const { years } = calendarProvider
  return (
    <>
      <PrevButton onClick={() => emitEvent('calendar.prevYears')} />
      <HeaderText>
        {years[0].year} - {years[years.length - 1].year}
      </HeaderText>
      <NextButton onClick={() => emitEvent('calendar.nextYears')} />
    </>
  )
}

export default function Header () {
  const { dataToView } = useContext(CalendarContext)

  const { classNames, HeaderProps } = useProps()

  return (
    <header
      className={resolveClassName(
        HeaderProps?.className,
        classNames?.Header,
        dataToView === 'days' && classNames?.HeaderMonth,
        dataToView === 'months' && classNames?.HeaderYear,
        dataToView === 'years' && classNames?.HeaderYearsRange
      )}
      {...HeaderProps}
    >
      {dataToView === 'days' && <Month />}
      {dataToView === 'months' && <Year />}
      {dataToView === 'years' && <YearsRange />}
    </header>
  )
}
