import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { CalendarContext } from '../../../context'
import {
  CalendarContext as CalendarContextType,
  DataToView,
  ButtonPropsCustomOnClick,
  DivProps
} from '../../../shared-types'
import Header from '../header'
import CalendarProvider from 'calendar-provider'

describe('<Header>', () => {
  const date = new Date(1998, 4, 8)
  const emitEventSpy = jest.fn()
  const contextValue = {} as CalendarContextType

  beforeEach(() => {
    Object.assign<CalendarContextType, CalendarContextType>(contextValue, {
      dataToView: 'days',
      emitEvent: emitEventSpy,
      calendarProvider: new CalendarProvider({ date }),
      dateMouseOver: new Date(),
      bind: {
        order: 0,
        props: {}
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render current month and year when dataToView is "days"', () => {
    contextValue.dataToView = 'days'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Header />
      </CalendarContext.Provider>
    )

    expect(getByText('May 1998')).toBeInTheDocument()
  })

  it('should render current year when dataToView is "months"', () => {
    contextValue.dataToView = 'months'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Header />
      </CalendarContext.Provider>
    )

    expect(getByText('1998')).toBeInTheDocument()
  })

  it('should render years range when dataToView is "years"', () => {
    contextValue.dataToView = 'years'
    const { getByText } = render(
      <CalendarContext.Provider value={contextValue}>
        <Header />
      </CalendarContext.Provider>
    )

    expect(getByText('1990 - 2005')).toBeInTheDocument()
  })

  test.each(['days', 'months', 'years'])(
    'should set PrevButtonProps when dataToView is "%s"',
    dataToView => {
      const onClickSpy = jest.fn()

      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.PrevButtonProps = {
        'data-testid': 'PrevButton',
        className: 'PrevButtonClassName',
        onClick: onClickSpy
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const prevButton = getByTestId('PrevButton')

      fireEvent.click(prevButton)

      expect(prevButton).toHaveClass('PrevButtonClassName')
      expect(onClickSpy).toHaveBeenCalled()
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set NextButtonProps when dataToView is "%s"',
    dataToView => {
      const onClickSpy = jest.fn()

      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.NextButtonProps = {
        'data-testid': 'NextButton',
        className: 'NextButtonClassName',
        onClick: onClickSpy
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const nextButton = getByTestId('NextButton')

      fireEvent.click(nextButton)

      expect(nextButton).toHaveClass('NextButtonClassName')
      expect(onClickSpy).toHaveBeenCalled()
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set HeaderTextProps when dataToView is "%s"',
    dataToView => {
      const onClickSpy = jest.fn()

      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.HeaderTextProps = {
        'data-testid': 'HeaderText',
        className: 'HeaderTextClassName',
        onClick: onClickSpy
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const headerText = getByTestId('HeaderText')

      fireEvent.click(headerText)

      expect(headerText).toHaveClass('HeaderTextClassName')
      expect(onClickSpy).toHaveBeenCalled()
    }
  )

  test.each([
    ['calendar.prevMonth', 'days'],
    ['calendar.prevYear', 'months'],
    ['calendar.prevYears', 'years']
  ])(
    'should call emitEvent with %s when click on PrevButton',
    (eventName, dataToView) => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.PrevButtonProps = {
        'data-testid': 'PrevButton'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const prevButton = getByTestId('PrevButton')

      fireEvent.click(prevButton)

      expect(emitEventSpy).toHaveBeenCalledWith(eventName)
    }
  )

  test.each([
    ['calendar.nextMonth', 'days'],
    ['calendar.nextYear', 'months'],
    ['calendar.nextYears', 'years']
  ])(
    'should call emitEvent with %s when click on NextButton',
    (eventName, dataToView) => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.NextButtonProps = {
        'data-testid': 'NextButton'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const nextButton = getByTestId('NextButton')

      fireEvent.click(nextButton)

      expect(emitEventSpy).toHaveBeenCalledWith(eventName)
    }
  )

  test.each([
    ['months', 'days'],
    ['years', 'months']
  ])(
    'should call emitEvent with setDataToView and %s when click on HeaderText',
    (eventValue, dataToView) => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.HeaderTextProps = {
        'data-testid': 'HeaderText'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const headerText = getByTestId('HeaderText')

      fireEvent.click(headerText)

      expect(emitEventSpy).toHaveBeenCalledWith('setDataToView', eventValue)
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set className to PrevButton when dataToView is "%s"',
    dataToView => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.classNames = {
        PrevButton: 'PrevButtonClass'
      }
      contextValue.bind.props.PrevButtonProps = {
        'data-testid': 'PrevButton'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const prevButton = getByTestId('PrevButton')

      expect(prevButton).toHaveClass('PrevButtonClass')
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set className to NextButton when dataToView is "%s"',
    dataToView => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.classNames = {
        NextButton: 'NextButtonClass'
      }
      contextValue.bind.props.NextButtonProps = {
        'data-testid': 'NextButton'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const nextButton = getByTestId('NextButton')

      expect(nextButton).toHaveClass('NextButtonClass')
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set className to HeaderText when dataToView is "%s"',
    dataToView => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.classNames = {
        HeaderText: 'HeaderTextClass'
      }
      contextValue.bind.props.HeaderTextProps = {
        'data-testid': 'HeaderText'
      } as ButtonPropsCustomOnClick

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const headerText = getByTestId('HeaderText')

      expect(headerText).toHaveClass('HeaderTextClass')
    }
  )

  test.each(['days', 'months', 'years'])(
    'should set className to Header when dataToView is "%s"',
    dataToView => {
      contextValue.dataToView = dataToView as DataToView
      contextValue.bind.props.classNames = {
        Header: 'HeaderClass'
      }
      contextValue.bind.props.HeaderProps = {
        'data-testid': 'Header'
      } as DivProps

      const { getByTestId } = render(
        <CalendarContext.Provider value={contextValue}>
          <Header />
        </CalendarContext.Provider>
      )

      const header = getByTestId('Header')

      expect(header).toHaveClass('HeaderClass')
    }
  )
})
