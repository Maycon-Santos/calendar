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
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ],
  daysDictionary: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  pick: 'single',
  pickLimit: Infinity,
  rangeSize: {
    min: 0,
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
