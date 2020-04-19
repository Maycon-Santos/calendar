<p align="center">
  <img src="https://raw.githubusercontent.com/Maycon-Santos/calendar/master/docs/assets/logo@2x.png">
</p>
<h2 align="center">
  Calendar<br />
  <a href="https://github.com/Maycon-Santos/calendar/issues">
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
  </a>
  <a href="http://hits.dwyl.com/Maycon-Santos/calendar">
    <img src="http://hits.dwyl.com/Maycon-Santos/calendar.svg">
  </a>
  <a href="https://snyk.io/test/github/Maycon-Santos/calendar">
    <img src="https://snyk.io/test/github/Maycon-Santos/calendar/badge.svg">
  </a>
</h2>

<p align="center">
  <b>Available to:</b><br />
  <a href="https://github.com/Maycon-Santos/calendar/tree/master/packages/react-nice-calendar">
    <img src="https://raw.githubusercontent.com/Maycon-Santos/calendar/master/docs/assets/react-button.png">
  </a>
</p>

- [About](#about)
- [Getting Started](#getting-started)
- [props](#props)
- [useCalendarBind](#usecalendarbind)
- [ClassNameKeys](#classnamekeys)

## About

It is a calendar that aims to be simple and efficient for anyone using. Using [`CalendarProvider`](https://github.com/Maycon-Santos/calendar/tree/master/packages/calendar-provider) to display years, months and days.  

Everything you will see here refers to all calendars in the repository, if there is a question about the calendar for a specific framework / library click on one of the buttons above (Available to).

[**Live demo**](http://maycon-santos.github.io/calendar)

## Getting Started

**Install for React:**
```sh
yarn add react-nice-calendar
```

**Usage**
```javascript
const [selectedDate, setSelectedDate] = useState()

return (
  <Calendar
    selectedDate={selectedDate}
    onChangeSelectedDate={setSelectedDate}
  />
)
```

## Props

| Name                 | Type                                                                                                                                 | Description                                                                                                                                        | Default value                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pick                 | 'single' \| 'multiple' \| 'range'                                                                                                       | Select the type of capture. <a href="https://maycon-santos.github.io/calendar/">See examples here.</a>                                                                                                     | single'                                                                                                                                                               |
| pickLimit            | Non-negative integer                                                                                                                 | Use when the "pick" prop is "multiple". It defines the maximum number of dates that can be selected.                                               | Infinity                                                                                                                                                              |
| rangeSize            | {<br>min: Non-negative integer,<br>max: Non-negative integer<br>}                                                                    | Use when the "pick" prop is "range". Defines the minimum and maximum number of the range.                                                          | {<br>min: 1,<br>max: Infinity<br>}                                                                                                                                    |
| onChangeSelectedDate | When "pick" prop is "single": (date: Date | null) => void<br><br>When "pick" prop is "multiple" or "range": (date: Date\[\]) => void | Function called when the user clicks on a date.                                                                                                    | n/a                                                                                                                                                                   |
| selectedDate         | When "pick" prop is "single": Date \| null<br><br>When "pick" prop is "multiple" or "range": Date\[\]                                 |                                                                                                                                                    | n/a                                                                                                                                                                      |
| monthsDictionary     | string\[\]                                                                                                                           | Each index in the array represents the month 0 through 11.                                                                                         | \[<br>'January',<br>'February',<br>'March',<br>'April',<br>'May',<br>'June',<br>'July',<br>'August',<br>'September',<br>'October',<br>'November',<br>'December'<br>\] |
| daysDictionary       | string\[\]                                                                                                                           | Each index in the array represents the day 0 through 6.                                                                                            | \[<br>'S',<br>'M',<br>'T',<br>'W',<br>'T',<br>'F',<br>'S'<br>\]                                                                                                       |
| classNames           | { \[key in classNameKeys\]: string }                                                                                                 | It receives the classes of each element of the calendar. <a href="#classnames">See the ClassNameKeys type here.</a>                                                          | n/a                                                                                                                                                                   |
| startDate            | Date                                                                                                                                 | The date that the calendar should display on the first render.                                                                                     | n/a                                                                                                                                                                   |
| filterInvalidDates   | (date: Date) => boolean                                                                                                              | A function that will be called the date iteration. The "true" return indicates that the date is invalid, so it should not be selected by the user. | n/a                                                                                                                                                                   |
| bind                 | CalendarBind                                                                                                                         | It is an object that is returned by "useCalendarBind". <a href="#usecalendarbind">Click here to learn more.</a>                                                                   | n/a                                                                                                                                                                   |
| HeaderProps          | HTMLDivElement props.                                                                                                                | Example: className, id & etc...                                                                                                                    | n/a                                                                                                                                                                   |
| PrevButtonProps      | HTMLButtonElement props with custom onClick event.                                                                                   | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |
| NextButtonProps      | HTMLButtonElement props with custom onClick event.                                                                                   | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |
| HeaderTextProps      | HTMLButtonElement props with custom onClick event.                                                                                   | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |
| DaysProps            | HTMLDivElement props.                                                                                                                | Example: className, id & etc...                                                                                                                    | n/a                                                                                                                                                                   |
| DayProps             | HTMLDivElement props.                                                                                                                | Example: className, id & etc...                                                                                                                    | n/a                                                                                                                                                                   |
| BodyProps            | HTMLDivElement props.                                                                                                                | Example: className, id & etc...                                                                                                                    | n/a                                                                                                                                                                   |
| CellsProps           | HTMLDivElement props.                                                                                                                | Example: className, id & etc...                                                                                                                    | n/a                                                                                                                                                                   |
| DateProps            | HTMLButtonElement props with custom onClick, mouseEnter & mouseLeave event.                                                          | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |
| MonthProps           | HTMLButtonElement props with custom onClick event.                                                                                   | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |
| YearProps            | HTMLButtonElement props with custom onClick event.                                                                                   | <a href="#custom-events">See custom events event here.</a>                                                                                                                      | n/a                                                                                                                                                                   |

#### Custom events

When the element already has an event handler and you want to apply one more: The function returns the original handler and the original event object. Example:

```javascript
  dateProps={{
    onClick: ({ originalEvent, originalHandler ) => {
      console.log(originalEvent.target)
      originalHandler()
    }
  }}
```

### useCalendarBind

A hook to connect the calendars. The props, events and styles will be shared between them. Example:

```javascript
import Calendar, { useCalendarBind } from 'react-nice-calendar'

const myComponent = () => {
  const [selectedDate, setSelectedDate] = useState()
  const bind = useCalendarBind()

  return (
    <>
      <Calendar
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
        bind={bind}
      />
      <Calendar bind={bind} />
    </>
  )
}
```

**Result:**  
  
<img src="https://raw.githubusercontent.com/Maycon-Santos/calendar/master/docs/assets/use-calendar-bind.gif" width="400" >

## ClassNameKeys

```
'Container'
'CalendarBinded'
'Header'
'HeaderMonth'
'HeaderYear'
'HeaderYearsRange'
'Days'
'Day'
'PrevButton'
'NextButton'
'HeaderText'
'Body'
'BodyDays'
'BodyMonths'
'BodyYears'
'Cells'
'Cell'
'DayCell'
'MonthCell'
'YearCell'
'ValidDate'
'InvalidDate'
'DayBelongCurrentMonth'
'CurrentDate'
'SelectedDate'
'BetweenRange'
'BetweenSelectedRange'
'UnderMinRange'
'OverMaxRange'
'InvalidDateBetweenRange'
'StartRangeDate'
'EndRangeDate'
'MouseOverEndRange'
```

The 'Calendar' class (which is the same element as the 'Container') is useful for knowing the order of this calendar when using the "bind" prop.

```javascript
return (
  <Calendar
    selectedDate={selectedDate}
    onChangeSelectedDate={setSelectedDate}
    bind={bind}
  /> // Has the Calendar1 class
  <Calendar bind={bind} /> // Has the Calendar2 class
  <Calendar bind={bind} /> // Has the Calendar3 class
)
```
