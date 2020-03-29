import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Calendar from '../react-calendar'
import { CalendarProps } from '../export'
import classNames from './classNames'

describe('<Calendar />', () => {
  const Component = (props: CalendarProps) => {
    const [selectedDate, setSelectedDate] = useState()

    console.log(selectedDate)

    return (
      <Calendar
        {...props}
        classNames={classNames}
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
      />
    )
  }

  it('should pick one date', () => {
    const { getByText } = render(<Component />)

    const day15 = getByText('15')

    fireEvent.click(day15)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
  })

  it('should pick multiple dates', () => {
    const { getByText } = render(<Component pick="multiple" />)

    const day15 = getByText('15')
    const day17 = getByText('17')
    const day20 = getByText('20')

    fireEvent.click(day15)
    fireEvent.click(day17)
    fireEvent.click(day20)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day17.classList.contains('SelectedDate')).toBe(true)
    expect(day20.classList.contains('SelectedDate')).toBe(true)
  })

  it('should pick multiple dates with limit', () => {
    const { getByText } = render(<Component pick="multiple" pickLimit={2} />)

    const day15 = getByText('15')
    const day17 = getByText('17')
    const day20 = getByText('20')

    fireEvent.click(day15)
    fireEvent.click(day17)
    fireEvent.click(day20)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day17.classList.contains('SelectedDate')).toBe(true)
    expect(day20.classList.contains('SelectedDate')).toBe(false)
  })

  it('should pick a range of dates', () => {
    const { getByText } = render(<Component pick="range" />)

    const day15 = getByText('15')
    const day16 = getByText('16')
    const day17 = getByText('17')
    const day18 = getByText('18')
    const day19 = getByText('19')
    const day20 = getByText('20')

    fireEvent.click(day15)
    fireEvent.click(day20)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day16.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day17.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day18.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day19.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day20.classList.contains('SelectedDate')).toBe(true)
  })

  it('should change class of the dates between range', () => {
    const { getByText } = render(<Component pick="range" />)

    const day15 = getByText('15')
    const day16 = getByText('16')
    const day17 = getByText('17')
    const day18 = getByText('18')
    const day19 = getByText('19')
    const day20 = getByText('20')

    fireEvent.click(day15)
    fireEvent.mouseEnter(day20)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day16.classList.contains('BetweenRange')).toBe(true)
    expect(day17.classList.contains('BetweenRange')).toBe(true)
    expect(day18.classList.contains('BetweenRange')).toBe(true)
    expect(day19.classList.contains('BetweenRange')).toBe(true)
    expect(day20.classList.contains('BetweenRange')).toBe(true)
  })

  it('should pick a range of dates with limit', () => {
    const { getByText } = render(<Component pick="range" rangeSize={{ min: 3, max: 5 }} />)

    const day15 = getByText('15')
    const day16 = getByText('16')
    const day17 = getByText('17')
    const day18 = getByText('18')
    const day19 = getByText('19')
    const day20 = getByText('20')

    fireEvent.click(day15)
    fireEvent.click(day17)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day16.classList.contains('BetweenSelectedRange')).toBe(false)
    expect(day17.classList.contains('BetweenSelectedRange')).toBe(false)
    expect(day18.classList.contains('BetweenSelectedRange')).toBe(false)
    expect(day19.classList.contains('BetweenSelectedRange')).toBe(false)
    expect(day20.classList.contains('SelectedDate')).toBe(false)

    fireEvent.click(day20)

    expect(day15.classList.contains('SelectedDate')).toBe(true)
    expect(day16.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day17.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day18.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day19.classList.contains('BetweenSelectedRange')).toBe(true)
    expect(day20.classList.contains('SelectedDate')).toBe(true)
  })

  it('shoud go to months', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        HeaderTextProps={{ title: 'Header' }}
      />
    )
    
    fireEvent.click(getByTitle('Header'))

    expect(container).toMatchSnapshot()
  })

  it('shoud go to years range', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        HeaderTextProps={{ title: 'Header' }}
      />
    )

    fireEvent.click(getByTitle('Header'))
    fireEvent.click(getByTitle('Header'))

    expect(container).toMatchSnapshot()
  })

  it('should go to next month', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        NextButtonProps={{ title: 'Next' }}
      />
    )

    const nextButton = getByTitle('Next')

    fireEvent.click(nextButton)

    expect(container).toMatchSnapshot()
  })

  it('should go to prev month', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        PrevButtonProps={{ title: 'Prev' }}
      />
    )

    const prevButton = getByTitle('Prev')

    fireEvent.click(prevButton)

    expect(container).toMatchSnapshot()
  })

  it('should go to next year', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        NextButtonProps={{ title: 'Next' }}
        HeaderTextProps={{ title: 'Header' }}
      />
    )

    const nextButton = getByTitle('Next')
    
    fireEvent.click(getByTitle('Header'))
    fireEvent.click(nextButton)

    expect(container).toMatchSnapshot()
  })

  it('should go to prev year', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        PrevButtonProps={{ title: 'Prev' }}
        HeaderTextProps={{ title: 'Header' }}
      />
    )

    fireEvent.click(getByTitle('Header'))
    const prevButton = getByTitle('Prev')

    fireEvent.click(prevButton)

    expect(container).toMatchSnapshot()
  })

  it('should go to next year range', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        NextButtonProps={{ title: 'Next' }}
        HeaderTextProps={{ title: 'Header' }}
      />
    )

    const nextButton = getByTitle('Next')
    
    fireEvent.click(getByTitle('Header'))
    fireEvent.click(getByTitle('Header'))
    fireEvent.click(nextButton)

    expect(container).toMatchSnapshot()
  })

  it('should go to prev year range', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByTitle, container } = render(
      <Component
        startDate={startDate}
        PrevButtonProps={{ title: 'Prev' }}
        HeaderTextProps={{ title: 'Header' }}
      />
    )

    fireEvent.click(getByTitle('Header'))
    fireEvent.click(getByTitle('Header'))
    const prevButton = getByTitle('Prev')

    fireEvent.click(prevButton)

    expect(container).toMatchSnapshot()
  })

  it('should render months of the monthsDictionary', () => {
    const startDate = new Date(1998, 0, 8)
    const monthsDictionary = [
      'January',
      'feverish',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const { getByText, getByTitle } = render(
      <Component
        startDate={startDate}
        monthsDictionary={monthsDictionary}
        NextButtonProps={{ title: 'Next' }}
      />
    )

    for (let i = 0; i < 12; i++) {
      expect(getByText(new RegExp(monthsDictionary[i]))).toBeInTheDocument()
      fireEvent.click(getByTitle('Next'))
    }
  })

  it('should render days of the daysDictionary', () => {
    const startDate = new Date(1998, 0, 8)
    const daysDictionary = [
      'Sunday',
      'Monday',
      'Tuesday',
      'fourth',
      'fifth',
      'Friday',
      'Saturday',
    ]
    const { getByText } = render(
      <Component
        startDate={startDate}
        daysDictionary={daysDictionary}
      />
    )

    for (let i = 0; i < 7; i++) {
      expect(getByText(daysDictionary[i])).toBeInTheDocument()
    }
  })

  it('should disable invalid dates with pick single', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByText } = render(
      <Component
        startDate={startDate}
        filterInvalidDates={date => date.getDate() === 15}
      />
    )
    
    const day15 = getByText('15')

    fireEvent.click(day15)

    expect(day15.classList.contains('SelectedDate')).toBe(false)
  })

  it('should disable invalid dates with pick multiple', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByText } = render(
      <Component
        pick="multiple"
        startDate={startDate}
        filterInvalidDates={date => date.getDate() === 15}
      />
    )
    
    const day15 = getByText('15')

    fireEvent.click(day15)

    expect(day15.classList.contains('SelectedDate')).toBe(false)
  })

  it('should disable invalid dates with pick range', () => {
    const startDate = new Date(1998, 5, 8)
    const { getByText } = render(
      <Component
        pick="range"
        startDate={startDate}
        filterInvalidDates={date => date.getDate() === 15}
      />
    )
    
    const day14 = getByText('14')
    const day15 = getByText('15')
    const day16 = getByText('16')

    fireEvent.click(day14)
    fireEvent.click(day16)

    expect(day14.classList.contains('SelectedDate')).toBe(true)
    expect(day15.classList.contains('BetweenRange')).toBe(false)
    expect(day15.classList.contains('BetweenSelectedRange')).toBe(false)
  })
})
