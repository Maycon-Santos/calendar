import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Calendar from '../export/calendar';
import useCalendarBind from '../hooks/use-calendar-bind';
import styles from './styles/wrapper.css';
import './styles/font-face.css';
export default {
    title: 'Calendar',
    component: Calendar
};
var actionSelectedDate = action('selected date');
var actionSelectedDates = action('selected dates');
var datesToLocaleString = function (dates) {
    return dates.map(function (d) { return d.toLocaleDateString(); });
};
export var single = function () {
    var _a = useState(), selectedDate = _a[0], setSelectedDate = _a[1];
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'single', selectedDate: selectedDate, onChangeSelectedDate: function (date) {
                setSelectedDate(date);
                if (date) {
                    actionSelectedDate.apply(void 0, datesToLocaleString([date]));
                }
                else {
                    actionSelectedDate(date);
                }
            } })));
};
export var multiple = function () {
    var _a = useState([]), selectedDate = _a[0], setSelectedDate = _a[1];
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'multiple', pickLimit: 5, selectedDate: selectedDate, onChangeSelectedDate: function (dates) {
                setSelectedDate(dates);
                actionSelectedDates.apply(void 0, datesToLocaleString(dates));
            } })));
};
export var range = function () {
    var _a = useState(), selectedDate = _a[0], setSelectedDate = _a[1];
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'range', rangeSize: {
                min: 4,
                max: 10
            }, selectedDate: selectedDate, onChangeSelectedDate: function (dates) {
                setSelectedDate(dates);
                actionSelectedDates.apply(void 0, datesToLocaleString(dates));
            } })));
};
export var single_with_bind = function () {
    var _a = useState(), selectedDate = _a[0], setSelectedDate = _a[1];
    var bind = useCalendarBind();
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'single', selectedDate: selectedDate, onChangeSelectedDate: function (date) {
                setSelectedDate(date);
                if (date) {
                    actionSelectedDate.apply(void 0, datesToLocaleString([date]));
                }
                else {
                    actionSelectedDate(date);
                }
            }, bind: bind }),
        React.createElement(Calendar, { bind: bind })));
};
export var multiple_with_bind = function () {
    var _a = useState([]), selectedDate = _a[0], setSelectedDate = _a[1];
    var bind = useCalendarBind();
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'multiple', pickLimit: 5, selectedDate: selectedDate, onChangeSelectedDate: function (dates) {
                setSelectedDate(dates);
                actionSelectedDates.apply(void 0, datesToLocaleString(dates));
            }, bind: bind }),
        React.createElement(Calendar, { bind: bind })));
};
export var range_with_bind = function () {
    var _a = useState(), selectedDate = _a[0], setSelectedDate = _a[1];
    var bind = useCalendarBind();
    return (React.createElement("div", { className: styles.Container },
        React.createElement(Calendar, { pick: 'range', rangeSize: {
                min: 4,
                max: 10
            }, selectedDate: selectedDate, onChangeSelectedDate: function (dates) {
                setSelectedDate(dates);
                actionSelectedDates.apply(void 0, datesToLocaleString(dates));
            }, bind: bind }),
        React.createElement(Calendar, { bind: bind })));
};
//# sourceMappingURL=react-calendar.stories.js.map