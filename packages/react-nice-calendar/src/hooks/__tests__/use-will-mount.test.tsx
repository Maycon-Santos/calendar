import React, { useState } from 'react'
import useWillMount from '../use-will-mount'
import { render, fireEvent } from '@testing-library/react'

describe('useWillMount', () => {
  it('should run the function one time', () => {
    const willMountSpy = jest.fn()
    const rerenderCounter = jest.fn()
    const Component = () => {
      const [counter, setCounter] = useState(0)

      rerenderCounter()

      useWillMount(willMountSpy)

      return (
        <button data-testid='Button' onClick={() => setCounter(counter + 1)} />
      )
    }

    const { getByTestId } = render(<Component />)

    const button = getByTestId('Button')

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(rerenderCounter).toBeCalledTimes(5)
    expect(willMountSpy).toBeCalledTimes(1)
  })
})
