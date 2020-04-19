import { useContext } from 'react'
import { CalendarContext } from '../context'
import { CalendarProps } from '../shared-types'

interface Props extends CalendarProps {
  monthsDictionary: Exclude<CalendarProps['monthsDictionary'], undefined>
  daysDictionary: Exclude<CalendarProps['daysDictionary'], undefined>
  pick: Exclude<CalendarProps['pick'], undefined>
  pickLimit: Exclude<CalendarProps['pickLimit'], undefined>
  rangeSize: Exclude<CalendarProps['rangeSize'], undefined>
}

export const defaultProps: Props = {
  monthsDictionary: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  daysDictionary: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  pick: 'single',
  pickLimit: Infinity,
  rangeSize: {
    min: 1,
    max: Infinity
  }
}

export default function useProps (): Props {
  const {
    bind: { props }
  } = useContext(CalendarContext)

  Object.keys(defaultProps).forEach(key => {
    if (defaultProps[key] && !props[key]) {
      props[key] = defaultProps[key]
    }
  })

  return props as Props
}
