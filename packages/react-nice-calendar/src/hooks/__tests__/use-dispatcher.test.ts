import { renderHook } from '@testing-library/react-hooks'
import * as eventsModule from '../../events'
import useDispatcher from '../use-dispatcher'

describe('useDispatcher', () => {
  const eventsMock = {
    event1: jest.fn(),
    event2: jest.fn()
  }

  const eventsFactoryMock = jest.fn().mockReturnValue(eventsMock)
  const dispatcherData = {}

  Object.defineProperty(eventsModule, 'default', {
    value: eventsFactoryMock
  })

  beforeEach(() => {
    Object.assign(dispatcherData, {
      bind: {
        order: 0,
        shared: {
          dispatchers: []
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    Object.keys(dispatcherData).forEach(key => {
      delete dispatcherData[key]
    })
  })

  it('should return dispatcher function', () => {
    // @ts-ignore
    const { result } = renderHook(() => useDispatcher(dispatcherData))

    expect(result.current).toBe(eventsMock)
  })
})
