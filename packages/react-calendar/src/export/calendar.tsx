import React, { useMemo, useEffect } from 'react'
import animate, { easingFunctions } from 'transition-engine'
import RawCalendar from '../react-calendar'
import { CalendarProps, CustomOnClick, CustomOnClickEvent, ButtonPropsCustomOnClick } from '../shared-types'
import calendarStyle from './styles/calendar.css'

export default function Calendar (props: CalendarProps) {
  const {
    classNames,
    BodyProps,
    HeaderTextProps,
    YearProps,
    MonthProps,
    PrevButtonProps,
    NextButtonProps,
    ...rest
  } = props
  const bodyRefs = useMemo<Array<HTMLDivElement | null>>(() => [], [])

  useEffect(() => {
    if (BodyProps?.ref && typeof BodyProps?.ref === 'object') {
      bodyRefs.push(BodyProps.ref.current)
    }
  }, [])

  const assignedStyle = { ...calendarStyle, ...classNames }

  const zoomAnimation = (from: number[], to: number[]): CustomOnClick => {
    return ({ originalHandler }) => {
      if (originalHandler) {
        animate({
          from,
          to,
          duration: 100,
          iterationCount: 2,
          timingFunction: [easingFunctions.easeInQuad, easingFunctions.easeOutQuad],
          transition ({ iteration, value, iterationProgress }) {
            bodyRefs.forEach(bodyRef => {
              if (bodyRef) {
                bodyRef.style.opacity = (iteration === 1 ? iterationProgress : 1 - iterationProgress).toString()
                bodyRef.style.transform = `scale(${value})`
              }
            })
          },
          iterationChange (iteration) {
            if (iteration === 1) originalHandler()
          }
        }).start()
      }
    }
  }

  const slideAnimation = (from: number[], to: number[]): CustomOnClick => {
    return ({ originalHandler }) => {
      if (originalHandler) {
        animate({
          from,
          to,
          duration: 200,
          iterationCount: 2,
          timingFunction: [easingFunctions.easeInQuad, easingFunctions.easeOutQuad],
          transition ({ iteration, value, iterationProgress }) {
            bodyRefs.forEach(bodyRef => {
              if (bodyRef) {
                bodyRef.style.opacity = (iteration === 1 ? iterationProgress : 1 - iterationProgress).toString()
                bodyRef.style.transform = `translateX(${value}px)`
              }
            })
          },
          iterationChange (iteration) {
            if (iteration === 1) originalHandler()
          }
        }).start()
      }
    }
  }

  const zoomOutAnimation = zoomAnimation([1, 1.05], [0.95, 1])
  const zooInAnimation = zoomAnimation([1, 0.95], [1.05, 1])

  const slideToLeftAnimation = slideAnimation([0, 20], [-20, 0])
  const slideToRightAnimation = slideAnimation([0, -20], [20, 0])

  const onClickHandler = (handler: CustomOnClick, componentProps?: ButtonPropsCustomOnClick) => {
    return (event: CustomOnClickEvent) => {
      const { originalEvent, originalHandler } = event
      if (componentProps?.onClick) {
        componentProps.onClick({
          originalEvent,
          originalHandler: originalHandler && (() => handler({ originalEvent, originalHandler }))
        })
      } else {
        handler({ originalEvent, originalHandler })
      }
    }
  }

  return (
    <RawCalendar
      {...rest}
      classNames={assignedStyle}
      BodyProps={{
        ref: typeof BodyProps?.ref === 'object' ? BodyProps.ref : ref => {
          if (ref && !bodyRefs.includes(ref)) {
            bodyRefs.push(ref)
          }
          if (typeof BodyProps?.ref === 'function') {
            BodyProps.ref(ref)
          }
        }
      }}
      HeaderTextProps={{
        onClick: zoomOutAnimation
      }}
      YearProps={{
        ...YearProps,
        onClick: onClickHandler(zooInAnimation, YearProps)
      }}
      MonthProps={{
        ...MonthProps,
        onClick: onClickHandler(zooInAnimation, MonthProps)
      }}
      PrevButtonProps={{
        ...PrevButtonProps,
        onClick: onClickHandler(slideToRightAnimation, PrevButtonProps)
      }}
      NextButtonProps={{
        ...NextButtonProps,
        onClick: onClickHandler(slideToLeftAnimation, NextButtonProps)
      }}
    />
  )
}
