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
- [useCalendarBind](#useCalendarBind)

## About

It is a calendar that aims to be simple and efficient for anyone using. Using [`CalendarProvider`](https://github.com/Maycon-Santos/calendar/tree/master/packages/calendar-provider) to display years, months and days.  

Everything you will see here refers to all calendars in the repository, if there is a question about the calendar for a specific framework / library click on one of the buttons above (Available to).

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

