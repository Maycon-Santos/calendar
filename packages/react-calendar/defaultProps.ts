import { ICalendarProps } from "./types"

interface IDefaultProps {
  monthsDictionary: Exclude<ICalendarProps['monthsDictionary'], undefined>
  daysDictionary: Exclude<ICalendarProps['daysDictionary'], undefined>
  startDate: Exclude<ICalendarProps['startDate'], undefined>
  pick: Exclude<ICalendarProps['pick'], undefined>
  pickLimit: Exclude<ICalendarProps['pickLimit'], undefined>
  rangeSize: Exclude<ICalendarProps['rangeSize'], undefined>
}

const defaultProps: IDefaultProps = {
  monthsDictionary: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  daysDictionary: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  startDate: new Date(),
  pick: 'single',
  pickLimit: Infinity,
  rangeSize: {
    min: 0,
    max: Infinity,
  }
}

export default defaultProps
