import React, { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useProps, { defaultProps } from '../use-props'
import { CalendarContext } from '../../context'
import { CalendarProps } from '../../shared-types'

describe('useProps', () => {
  const props = {} as CalendarProps

  const wrapper = ({ children }: { children: ReactNode }) => (
    <CalendarContext.Provider
      // @ts-ignore
      value={{
        // @ts-ignore
        bind: {
          props
        }
      }}
    >
      {children}
    </CalendarContext.Provider>
  )

  it('should return default props', () => {
    const { result } = renderHook(() => useProps(), { wrapper })
    expect(result.current).toStrictEqual(defaultProps)
  })

  it('should return the inputted props', () => {
    const newProps = {
      pick: 'range',
      classNames: {
        className1: 'classNameValue1',
        className2: 'classNameValue2',
        className3: 'classNameValue3'
      }
    }

    Object.assign(props, newProps)

    const { result } = renderHook(() => useProps(), { wrapper })
    expect(result.current).toStrictEqual({ ...defaultProps, ...newProps })
  })
})
