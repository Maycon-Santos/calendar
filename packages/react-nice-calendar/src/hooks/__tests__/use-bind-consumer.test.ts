import { renderHook } from '@testing-library/react-hooks'
import useBindConsumer from '../use-bind-consumer'
import useCalendarBind from '../use-calendar-bind'

describe('useBindConsumer', () => {
  it('should return the bind value', () => {
    const { result } = renderHook(() => useBindConsumer({ props: {} }))
    expect(result.current).toEqual({ order: 0, props: {} })
  })

  it('should return prop in the bind value', () => {
    const props = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3'
    }
    // @ts-ignore
    const { result } = renderHook(() => useBindConsumer({ props }))
    expect(result.current.props).toStrictEqual(props)
  })

  it('should return shared in the bind value', () => {
    const shared = {
      shared1: 'value1',
      shared2: 'value2',
      shared3: 'value3'
    }
    const calendarBind = renderHook(() => useCalendarBind())
    const props = { bind: calendarBind.result.current }

    // @ts-ignore
    const { result } = renderHook(() => useBindConsumer({ shared, props }))
    expect(result.current.shared).toStrictEqual(shared)
  })

  it('should return de order in the bind value', () => {
    const calendarBind = renderHook(() => useCalendarBind())
    const props = { bind: calendarBind.result.current }

    for (let i = 0; i < 5; i++) {
      const { result } = renderHook(() => useBindConsumer({ props }))
      expect(result.current.order).toBe(i)
    }
  })

  it('should add the Owner Symbol to owners array', () => {
    const calendarBind = renderHook(() => useCalendarBind())
    const props = { bind: calendarBind.result.current }

    for (let i = 0; i < 5; i++) {
      renderHook(() => useBindConsumer({ props }))
      expect(
        props.bind?.owners[props.bind?.owners.length - 1].toString()
      ).toEqual('Symbol(Owner)')
    }

    expect(props.bind?.owners).toHaveLength(5)
  })
})
