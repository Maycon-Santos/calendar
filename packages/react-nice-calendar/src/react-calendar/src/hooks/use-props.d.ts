import { CalendarProps } from '../shared-types'
interface Props extends CalendarProps {
  monthsDictionary: Exclude<CalendarProps['monthsDictionary'], undefined>
  daysDictionary: Exclude<CalendarProps['daysDictionary'], undefined>
  pick: Exclude<CalendarProps['pick'], undefined>
  pickLimit: Exclude<CalendarProps['pickLimit'], undefined>
  rangeSize: Exclude<CalendarProps['rangeSize'], undefined>
}
export declare const defaultProps: Props
export default function useProps (): Props
export {}
