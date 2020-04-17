import { renderHook } from '@testing-library/react-hooks'
import useCalendarBind from '../use-calendar-bind'

describe('useCalendarBind', () => {
  it('should return the binder value', () => {
    const { result } = renderHook(() => useCalendarBind())
    expect(result.current).toStrictEqual({
      owners: [],
      props: {}
    })
  })
})
