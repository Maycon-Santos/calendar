import React from 'react'
import customOnClick from '../custom-event'

describe('customOnClick', () => {
  it('should return the custom event', () => {
    const original = jest.fn()
    const substitute = jest.fn()
    const customOnClickFn = customOnClick(original, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customOnClickFn(eventMock)

    expect(
      typeof substitute.mock.calls[0][0].originalHandler === 'function'
    ).toBe(true)
    expect(substitute.mock.calls[0][0].event).toBe(eventMock)
  })

  it('should call original function', () => {
    const original = jest.fn()
    const substitute = jest.fn()
    const customOnClickFn = customOnClick(original, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customOnClickFn(eventMock)

    substitute.mock.calls[0][0].originalHandler()

    expect(original).toHaveBeenCalledWith(eventMock)
  })

  it('should call substitute function when the original is invalid', () => {
    const substitute = jest.fn()
    const customOnClickFn = customOnClick(undefined, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customOnClickFn(eventMock)

    expect(substitute).toHaveBeenCalledWith({ event: eventMock })
  })

  it('should call original function when the substitute is invalid', () => {
    const original = jest.fn()
    const customOnClickFn = customOnClick(original)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customOnClickFn(eventMock)

    expect(original).toHaveBeenCalledWith(eventMock)
  })

  it('should not call nothing', () => {
    const customOnClickFn = customOnClick()
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    expect(customOnClickFn(eventMock)).toBe(false)
  })
})
