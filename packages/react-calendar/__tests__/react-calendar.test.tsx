import React from 'react'
import { render } from '@testing-library/react'
import Calendar from '../react-calendar'

describe('<Calendar />', () => {
  it('should render', () => {
    console.log(Calendar)
    const { container } = render(<Calendar />)
    console.log(container)
  })
})
