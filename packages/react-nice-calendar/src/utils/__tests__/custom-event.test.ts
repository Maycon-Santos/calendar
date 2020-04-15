import React from 'react'
import customEvent from '../custom-event'

describe('customEvent', () => {
  it('should return the custom event', () => {
    const original = jest.fn()
    const substitute = jest.fn()
    const customEventFn = customEvent(original, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customEventFn(eventMock)

    expect(
      typeof substitute.mock.calls[0][0].originalHandler === 'function'
    ).toBe(true)
    expect(substitute.mock.calls[0][0].event).toBe(eventMock)
  })

  it('should call original function', () => {
    const original = jest.fn()
    const substitute = jest.fn()
    const customEventFn = customEvent(original, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customEventFn(eventMock)

    substitute.mock.calls[0][0].originalHandler()

    expect(original).toHaveBeenCalledWith(eventMock)
  })

  it('should call substitute function when the original is invalid', () => {
    const substitute = jest.fn()
    const customEventFn = customEvent(undefined, substitute)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customEventFn(eventMock)

    expect(substitute).toHaveBeenCalledWith({ event: eventMock })
  })

  it('should call original function when the substitute is invalid', () => {
    const original = jest.fn()
    const customEventFn = customEvent(original)
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    customEventFn(eventMock)

    expect(original).toHaveBeenCalledWith(eventMock)
  })

  it('should not call nothing', () => {
    const customEventFn = customEvent()
    const eventMock = {} as React.MouseEvent<HTMLElement, MouseEvent>

    expect(customEventFn(eventMock)).toBe(false)
  })
})
