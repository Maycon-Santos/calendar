import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import useForceUpdate from '../use-force-update'

describe('useForceUpdate', () => {
  it('should rerender the component', () => {
    const rendersCounter = jest.fn()

    function Component () {
      const forceUpdate = useForceUpdate()
      rendersCounter()

      return <button onClick={forceUpdate} data-testid='Button' />
    }

    const { getByTestId } = render(<Component />)

    fireEvent.click(getByTestId('Button'))

    expect(rendersCounter).toBeCalledTimes(2)
  })
})
