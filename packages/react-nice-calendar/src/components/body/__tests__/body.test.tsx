import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import CalendarProvider from 'calendar-provider'
import { CalendarContext } from '../../../context'
import {
  CalendarContext as CalendarContextType,
  CalendarProps,
  ButtonPropsCustomOnClick
} from '../../../shared-types'
import Body from '../body'

describe('<Body>', () => {
  const date = new Date(1998, 4, 8)
  const emitEventSpy = jest.fn()
  const contextValue = {} as CalendarContextType

  beforeEach(() => {
    Object.assign<CalendarContextType, CalendarContextType>(contextValue, {
      dataToView: 'days',
      emitEvent: emitEventSpy,
      calendarProvider: new CalendarProvider({ date }),
      dateMouseOver: null,
      bind: {
        order: 0,
        props: {
          daysDictionary: [
            'day1',
            'day2',
            'day3',
            'day4',
            'day5',
            'day6',
            'day7'
          ],
          monthsDictionary: [
            'month1',
            'month2',
            'month3',
            'month4',
            'month5',
            'month6',
            'month7',
            'month8',
            'month9',
            'month10',
            'month11',
            'month12'
          ]
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render days', () => {
    contextValue.dataToView = 'days'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('day1')).toBeInTheDocument()
    expect(getByText('day2')).toBeInTheDocument()
    expect(getByText('day3')).toBeInTheDocument()
    expect(getByText('day4')).toBeInTheDocument()
    expect(getByText('day5')).toBeInTheDocument()
    expect(getByText('day6')).toBeInTheDocument()
    expect(getByText('day7')).toBeInTheDocument()
    expect(getByText('15')).toBeInTheDocument()
  })

  it('should render months', () => {
    contextValue.dataToView = 'months'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('month1')).toBeInTheDocument()
    expect(getByText('month2')).toBeInTheDocument()
    expect(getByText('month3')).toBeInTheDocument()
    expect(getByText('month4')).toBeInTheDocument()
    expect(getByText('month5')).toBeInTheDocument()
    expect(getByText('month6')).toBeInTheDocument()
    expect(getByText('month7')).toBeInTheDocument()
    expect(getByText('month8')).toBeInTheDocument()
    expect(getByText('month9')).toBeInTheDocument()
    expect(getByText('month10')).toBeInTheDocument()
    expect(getByText('month11')).toBeInTheDocument()
    expect(getByText('month12')).toBeInTheDocument()
  })

  it('should render years', () => {
    contextValue.dataToView = 'years'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('1990')).toBeInTheDocument()
    expect(getByText('1991')).toBeInTheDocument()
    expect(getByText('1992')).toBeInTheDocument()
    expect(getByText('1993')).toBeInTheDocument()
    expect(getByText('1994')).toBeInTheDocument()
    expect(getByText('1995')).toBeInTheDocument()
    expect(getByText('1996')).toBeInTheDocument()
    expect(getByText('1997')).toBeInTheDocument()
    expect(getByText('1998')).toBeInTheDocument()
    expect(getByText('1999')).toBeInTheDocument()
    expect(getByText('2000')).toBeInTheDocument()
    expect(getByText('2001')).toBeInTheDocument()
    expect(getByText('2002')).toBeInTheDocument()
    expect(getByText('2003')).toBeInTheDocument()
    expect(getByText('2004')).toBeInTheDocument()
    expect(getByText('2005')).toBeInTheDocument()
  })

  it.each(['single', 'multiple', 'range'])(
    'should call emitEvent with setSelectedDate and date by click on day when pick is %s',
    pick => {
      contextValue.dataToView = 'days'
      contextValue.bind.props.pick = pick as CalendarProps['pick']
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getByText('15'))

      expect(emitEventSpy).toBeCalledWith(
        'setSelectedDate',
        new Date(1998, 4, 15)
      )
    }
  )

  it.each(['single', 'multiple', 'range'])(
    'should call emitEvent with removeSelectedDate and date by click on selected day when pick is %s',
    pick => {
      contextValue.dataToView = 'days'
      contextValue.bind.props.pick = pick as CalendarProps['pick']
      contextValue.bind.props.selectedDate =
        pick === 'single' ? new Date(1998, 4, 15) : [new Date(1998, 4, 15)]
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getByText('15'))

      expect(emitEventSpy).toBeCalledWith(
        'removeSelectedDate',
        new Date(1998, 4, 15)
      )
    }
  )

  it.each(['single', 'multiple', 'range'])(
    'should add class SelectedDate on selected day when pick is %s',
    pick => {
      contextValue.dataToView = 'days'
      contextValue.bind.props.pick = pick as CalendarProps['pick']
      contextValue.bind.props.selectedDate =
        pick === 'single' ? new Date(1998, 4, 15) : [new Date(1998, 4, 15)]
      contextValue.bind.props.classNames = {
        SelectedDate: 'SelectedDate'
      }
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      expect(getByText('15')).toHaveClass('SelectedDate')
    }
  )

  it.each(['single', 'multiple', 'range'])(
    'should not call emitEvent on click date not belong current month when pick is %s',
    pick => {
      contextValue.dataToView = 'days'
      contextValue.bind.props.pick = pick as CalendarProps['pick']
      const { getAllByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getAllByText('1')[1])

      expect(emitEventSpy).not.toHaveBeenCalled()
    }
  )

  it.each(['single', 'multiple', 'range'])(
    'should not call emitEvent on click invalid date when pick is %s',
    pick => {
      contextValue.dataToView = 'days'
      contextValue.bind.props.pick = pick as CalendarProps['pick']
      contextValue.bind.props.filterInvalidDates = date => date.getDate() === 8
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getByText('8'))

      expect(emitEventSpy).not.toHaveBeenCalled()
    }
  )

  it('should add class CurrentDate on current day', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.classNames = {
      CurrentDate: 'CurrentDate'
    }

    const originalDate = global.Date
    const mockedDate = (date: any) => {
      if (date) {
        return new originalDate(date)
      }

      return new originalDate(1998, 4, 15)
    }

    mockedDate.UTC = originalDate.UTC
    mockedDate.parse = originalDate.parse
    mockedDate.now = originalDate.now

    global.Date = mockedDate as any

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('15')).toHaveClass('CurrentDate')

    global.Date = originalDate
  })

  it('should add class InvalidDate on invalid date', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.filterInvalidDates = date => date.getDate() === 15
    contextValue.bind.props.classNames = {
      InvalidDate: 'InvalidDate'
    }
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('15')).toHaveClass('InvalidDate')
  })

  it('should add day cells common classNames', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.classNames = {
      Cell: 'Cell',
      DayCell: 'DayCell',
      ValidDate: 'ValidDate'
    }
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('15')).toHaveClass('Cell', 'DayCell', 'ValidDate')
  })

  it('should add class DayBelongCurrentMonth on days belong current month', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.classNames = {
      DayBelongCurrentMonth: 'DayBelongCurrentMonth'
    }
    const { getByText, getAllByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    const days = [
      26,
      27,
      28,
      29,
      30,
      ...Array(31)
        .fill(0)
        .map((_, key) => key + 1),
      1,
      2,
      3,
      4,
      5,
      6
    ]

    days.forEach(day => {
      if (day >= 1 && day <= 6) {
        expect(getAllByText(day.toString())[0]).toHaveClass(
          'DayBelongCurrentMonth'
        )
        expect(getAllByText(day.toString())[1]).not.toHaveClass(
          'DayBelongCurrentMonth'
        )
      } else if (day >= 26 && day <= 30) {
        expect(getAllByText(day.toString())[1]).toHaveClass(
          'DayBelongCurrentMonth'
        )
        expect(getAllByText(day.toString())[0]).not.toHaveClass(
          'DayBelongCurrentMonth'
        )
      } else {
        expect(getByText(day.toString())).toHaveClass('DayBelongCurrentMonth')
      }
    })
  })

  it('should add DateProps', () => {
    const onClickSpy = jest.fn()

    contextValue.dataToView = 'days'
    contextValue.bind.props.DateProps = {
      'data-testid': 'DayCell',
      className: 'DayCell',
      onClick: onClickSpy
    } as ButtonPropsCustomOnClick

    const { getAllByTestId } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    const dayCells = getAllByTestId('DayCell')

    dayCells.forEach(dayCell => fireEvent.click(dayCell))

    dayCells.forEach(dayCell => expect(dayCell).toHaveClass('DayCell'))
    expect(onClickSpy).toHaveBeenCalledTimes(42)
  })

  it('should add class BetweenRange on date mouse enter', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.classNames = {
      BetweenRange: 'BetweenRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    fireEvent.mouseEnter(getByText('15'))

    expect(emitEventSpy).toBeCalledWith(
      'setDateMouseOver',
      new Date(1998, 4, 15)
    )
    for (let i = 0; i < 8; i++) {
      expect(getByText((8 + i).toString())).toHaveClass('BetweenRange')
    }
  })

  it('should call emitEvent with setDateMouseOver and null on date mouse leave', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.bind.props.classNames = {
      BetweenRange: 'BetweenRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    fireEvent.mouseLeave(getByText('15'))

    expect(emitEventSpy).toBeCalledWith('setDateMouseOver', null)
  })

  it('should add class BetweenSelectedRange on date between selected range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [
      new Date(1998, 4, 8),
      new Date(1998, 4, 15)
    ]
    contextValue.bind.props.classNames = {
      BetweenSelectedRange: 'BetweenSelectedRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    for (let i = 0; i < 8; i++) {
      expect(getByText((8 + i).toString())).toHaveClass('BetweenSelectedRange')
    }
  })

  it('should add class UnderMinRange on dates between min range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 10)
    contextValue.bind.props.rangeSize = {
      min: 5,
      max: 6
    }
    contextValue.bind.props.classNames = {
      UnderMinRange: 'UnderMinRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    for (let i = 0; i < 3; i++) {
      expect(getByText((8 + i).toString())).toHaveClass('UnderMinRange')
    }
  })

  it('should add class OverMaxRange on dates over max range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.rangeSize = {
      min: 1,
      max: 3
    }
    contextValue.bind.props.classNames = {
      OverMaxRange: 'OverMaxRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    for (let i = 0; i < 3; i++) {
      expect(getByText((12 + i).toString())).toHaveClass('OverMaxRange')
    }
  })

  it('should add class InvalidDateBetweenRange on invalid dates between range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.bind.props.filterInvalidDates = date => date.getDate() === 10
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.rangeSize = {
      min: 1,
      max: 3
    }
    contextValue.bind.props.classNames = {
      InvalidDateBetweenRange: 'InvalidDateBetweenRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('10')).toHaveClass('InvalidDateBetweenRange')
  })

  it('should add class StartRangeDate on first date of range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.rangeSize = {
      min: 1,
      max: 3
    }
    contextValue.bind.props.classNames = {
      StartRangeDate: 'StartRangeDate'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('8')).toHaveClass('StartRangeDate')
  })

  it('should add class MouseOverEndRange on last date of range mouse over', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.rangeSize = {
      min: 1,
      max: 3
    }
    contextValue.bind.props.classNames = {
      MouseOverEndRange: 'MouseOverEndRange'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('15')).toHaveClass('MouseOverEndRange')
  })

  it('should add class EndRangeDate on last date of range', () => {
    contextValue.dataToView = 'days'
    contextValue.bind.props.pick = 'range'
    contextValue.bind.props.selectedDate = [new Date(1998, 4, 8)]
    contextValue.dateMouseOver = new Date(1998, 4, 15)
    contextValue.bind.props.rangeSize = {
      min: 1,
      max: 3
    }
    contextValue.bind.props.classNames = {
      EndRangeDate: 'EndRangeDate'
    }

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('15')).toHaveClass('EndRangeDate')
  })

  it('should add months classNames', () => {
    contextValue.dataToView = 'months'
    contextValue.bind.props.classNames = {
      Cell: 'Cell',
      MonthCell: 'MonthCell'
    }
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('month1')).toHaveClass('Cell', 'MonthCell')
  })

  it('should add MonthProps', () => {
    const onClickSpy = jest.fn()

    contextValue.dataToView = 'months'
    contextValue.bind.props.MonthProps = {
      'data-testid': 'MonthCell',
      className: 'MonthCell',
      onClick: onClickSpy
    } as ButtonPropsCustomOnClick

    const { getAllByTestId } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    const monthCells = getAllByTestId('MonthCell')

    monthCells.forEach(monthCell => fireEvent.click(monthCell))

    monthCells.forEach(monthCell => expect(monthCell).toHaveClass('MonthCell'))
    expect(onClickSpy).toHaveBeenCalledTimes(12)
  })

  it('should add class CurrentDate on current month', () => {
    contextValue.dataToView = 'months'
    contextValue.bind.props.classNames = {
      CurrentDate: 'CurrentDate'
    }

    const originalDate = global.Date
    const mockedDate = (date: any) => {
      if (date) {
        return new originalDate(date)
      }

      return new originalDate(1998, 4, 15)
    }

    mockedDate.UTC = originalDate.UTC
    mockedDate.parse = originalDate.parse
    mockedDate.now = originalDate.now

    global.Date = mockedDate as any

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('month5')).toHaveClass('CurrentDate')

    global.Date = originalDate
  })

  it.each([0, 1, 2, 3])(
    'should call emitEvent with calendar.goto and date on click month when order is %i',
    order => {
      contextValue.dataToView = 'months'
      contextValue.bind.order = order
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getByText('month1'))

      expect(emitEventSpy).toHaveBeenCalledWith(
        'calendar.goto',
        new Date(1998, -order, 1)
      )
    }
  )

  it('should call emitEvent with setDataToView and days on click month', () => {
    contextValue.dataToView = 'months'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    fireEvent.click(getByText('month5'))

    expect(emitEventSpy).toHaveBeenCalledWith('setDataToView', 'days')
  })

  it('should add years classNames', () => {
    contextValue.dataToView = 'years'
    contextValue.bind.props.classNames = {
      Cell: 'Cell',
      YearCell: 'YearCell'
    }
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('1990')).toHaveClass('Cell', 'YearCell')
  })

  it('should add YearProps', () => {
    const onClickSpy = jest.fn()

    contextValue.dataToView = 'years'
    contextValue.bind.props.YearProps = {
      'data-testid': 'YearCell',
      className: 'YearCell',
      onClick: onClickSpy
    } as ButtonPropsCustomOnClick

    const { getAllByTestId } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    const yearCells = getAllByTestId('YearCell')

    yearCells.forEach(yearCell => fireEvent.click(yearCell))

    yearCells.forEach(yearCell => expect(yearCell).toHaveClass('YearCell'))
    expect(onClickSpy).toHaveBeenCalledTimes(16)
  })

  it('should add class CurrentDate on current year', () => {
    contextValue.dataToView = 'years'
    contextValue.bind.props.classNames = {
      CurrentDate: 'CurrentDate'
    }

    const originalDate = global.Date
    const mockedDate = (date: any) => {
      if (date) {
        return new originalDate(date)
      }

      return new originalDate(1998, 4, 15)
    }

    mockedDate.UTC = originalDate.UTC
    mockedDate.parse = originalDate.parse
    mockedDate.now = originalDate.now

    global.Date = mockedDate as any

    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    expect(getByText('1998')).toHaveClass('CurrentDate')

    global.Date = originalDate
  })

  it.each([0, 1, 2, 3])(
    'should call emitEvent with calendar.goto and date on click year when order is %i',
    order => {
      contextValue.dataToView = 'years'
      contextValue.bind.order = order
      const { getByText } = render(
        <CalendarContext.Provider value={contextValue}>
          <Body />
        </CalendarContext.Provider>
      )

      fireEvent.click(getByText('1990'))

      expect(emitEventSpy).toHaveBeenCalledWith(
        'calendar.goto',
        new Date(1990 - order, 0, 1)
      )
    }
  )

  it('should call emitEvent with setDataToView and months on click month', () => {
    contextValue.dataToView = 'years'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Body />
      </CalendarContext.Provider>
    )

    fireEvent.click(getByText('1995'))

    expect(emitEventSpy).toHaveBeenCalledWith('setDataToView', 'months')
  })
})
