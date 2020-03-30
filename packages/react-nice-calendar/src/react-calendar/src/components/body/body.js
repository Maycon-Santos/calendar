var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useContext } from 'react';
import { CalendarContext } from '../../context';
import useProps from '../../hooks/use-props';
import classNameResolve from '../../utils/classname-resolve';
import compareDates from '../../utils/compare-dates';
import dateIncludes from '../../utils/date-includes';
import customOnClick from '../../utils/onclick-handler';
import getSelectedDates from '../../utils/selected-dates';
import getPickRangeClassNames from './pick-range-classnames';
function Days() {
    var _a = useContext(CalendarContext), calendarProvider = _a.calendarProvider, dateMouseOver = _a.dateMouseOver, emitEvent = _a.emitEvent;
    var _b = useProps(), pick = _b.pick, selectedDate = _b.selectedDate, filterInvalidDates = _b.filterInvalidDates, DateProps = _b.DateProps, classNames = _b.classNames, rangeSize = _b.rangeSize;
    var days = calendarProvider.days;
    var selectedDates = getSelectedDates(selectedDate);
    return (React.createElement(React.Fragment, null, days.map(function (_a) {
        var date = _a.date, day = _a.day, belongCurrentMonth = _a.belongCurrentMonth;
        var isCurrentDate = compareDates(date, new Date());
        var isSelectedDate = dateIncludes(selectedDates, date);
        var isInvalidDate = filterInvalidDates ? filterInvalidDates(date) : false;
        var isPickRange = pick === 'range';
        var pickRangeClassNames = isPickRange ? getPickRangeClassNames({
            selectedDates: selectedDates,
            dateMouseOver: dateMouseOver,
            date: date,
            rangeSize: rangeSize,
            isInvalidDate: isInvalidDate,
            classNames: classNames,
        }) : [];
        var clickHandler = function () {
            if (isSelectedDate) {
                emitEvent('calendar.removeSelectedDate', date);
                if (isPickRange) {
                    emitEvent('setDateMouseOver', date);
                }
            }
            else if (belongCurrentMonth && !isInvalidDate) {
                emitEvent('calendar.addSelectedDate', date);
            }
        };
        var mouseEnterHandler = function () {
            if (isPickRange && belongCurrentMonth && selectedDates.length === 1) {
                emitEvent('setDateMouseOver', date);
            }
        };
        var mouseLeaveHandler = function () {
            if (isPickRange) {
                emitEvent('setDateMouseOver', null);
            }
        };
        return (React.createElement("button", __assign({}, DateProps, { key: day + belongCurrentMonth.toString(), type: "button", className: classNameResolve.apply(void 0, __spreadArrays([DateProps === null || DateProps === void 0 ? void 0 : DateProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Cell, classNames === null || classNames === void 0 ? void 0 : classNames.DayCell, isInvalidDate ? classNames === null || classNames === void 0 ? void 0 : classNames.InvalidDate : classNames === null || classNames === void 0 ? void 0 : classNames.ValidDate,
                belongCurrentMonth && (classNames === null || classNames === void 0 ? void 0 : classNames.DayBelongCurrentMonth),
                isCurrentDate && (classNames === null || classNames === void 0 ? void 0 : classNames.CurrentDate),
                isSelectedDate && (classNames === null || classNames === void 0 ? void 0 : classNames.SelectedDate)], pickRangeClassNames)), onClick: customOnClick(clickHandler, DateProps === null || DateProps === void 0 ? void 0 : DateProps.onClick), onMouseEnter: customOnClick(mouseEnterHandler, DateProps === null || DateProps === void 0 ? void 0 : DateProps.onClick), onMouseLeave: customOnClick(mouseLeaveHandler, DateProps === null || DateProps === void 0 ? void 0 : DateProps.onClick) }), day));
    })));
}
function Months() {
    var _a = useContext(CalendarContext), calendarProvider = _a.calendarProvider, emitEvent = _a.emitEvent, order = _a.bind.order;
    var _b = useProps(), classNames = _b.classNames, monthsDictionary = _b.monthsDictionary, selectedDate = _b.selectedDate, MonthProps = _b.MonthProps;
    var months = calendarProvider.months;
    var selectedDates = getSelectedDates(selectedDate);
    return (React.createElement(React.Fragment, null, months.map(function (_a) {
        var date = _a.date, month = _a.month;
        var currentDate = new Date();
        var dateString = "" + date.getMonth() + date.getFullYear();
        var currentDateString = "" + currentDate.getMonth() + currentDate.getFullYear();
        var clonedSelectedDates = selectedDates.map(function (_date) {
            var clonedDate = new Date(_date);
            clonedDate.setDate(1);
            return clonedDate;
        });
        var clickHandler = function () {
            var clonedDate = new Date(date);
            clonedDate.setMonth(clonedDate.getMonth() - order);
            emitEvent('calendar.goto', clonedDate);
            emitEvent('setDataToView', 'days');
        };
        return (React.createElement("button", __assign({}, MonthProps, { key: month, type: "button", className: classNameResolve(MonthProps === null || MonthProps === void 0 ? void 0 : MonthProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Cell, classNames === null || classNames === void 0 ? void 0 : classNames.MonthCell, dateString === currentDateString && (classNames === null || classNames === void 0 ? void 0 : classNames.CurrentDate), dateIncludes(clonedSelectedDates, date) && (classNames === null || classNames === void 0 ? void 0 : classNames.SelectedDate)), onClick: customOnClick(clickHandler, MonthProps === null || MonthProps === void 0 ? void 0 : MonthProps.onClick) }), monthsDictionary[month]));
    })));
}
function Years() {
    var _a = useContext(CalendarContext), calendarProvider = _a.calendarProvider, emitEvent = _a.emitEvent, order = _a.bind.order;
    var _b = useProps(), classNames = _b.classNames, selectedDate = _b.selectedDate, YearProps = _b.YearProps;
    var years = calendarProvider.years;
    var selectedDates = getSelectedDates(selectedDate);
    return (React.createElement(React.Fragment, null, years.map(function (_a) {
        var date = _a.date, year = _a.year;
        var currentDate = new Date();
        var clonedSelectedDates = selectedDates.map(function (_date) {
            var clonedDate = new Date(_date);
            clonedDate.setDate(1);
            clonedDate.setMonth(0);
            return clonedDate;
        });
        var clickHandler = function () {
            var clonedDate = new Date(date);
            clonedDate.setFullYear(clonedDate.getFullYear() - order);
            emitEvent('calendar.goto', clonedDate);
            emitEvent('setDataToView', 'months');
        };
        return (React.createElement("button", { key: year, type: "button", className: classNameResolve(YearProps === null || YearProps === void 0 ? void 0 : YearProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Cell, classNames === null || classNames === void 0 ? void 0 : classNames.YearCell, date.getFullYear() === currentDate.getFullYear() && (classNames === null || classNames === void 0 ? void 0 : classNames.CurrentDate), dateIncludes(clonedSelectedDates, date) && (classNames === null || classNames === void 0 ? void 0 : classNames.SelectedDate)), onClick: customOnClick(clickHandler, YearProps === null || YearProps === void 0 ? void 0 : YearProps.onClick) }, year));
    })));
}
export default function Body() {
    var dataToView = useContext(CalendarContext).dataToView;
    var _a = useProps(), classNames = _a.classNames, BodyProps = _a.BodyProps, DaysProps = _a.DaysProps, DayProps = _a.DayProps, CellsProps = _a.CellsProps, daysDictionary = _a.daysDictionary;
    return (React.createElement("div", __assign({}, BodyProps, { className: classNameResolve(BodyProps === null || BodyProps === void 0 ? void 0 : BodyProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Body, dataToView === 'days' && (classNames === null || classNames === void 0 ? void 0 : classNames.BodyDays), dataToView === 'months' && (classNames === null || classNames === void 0 ? void 0 : classNames.BodyMonths), dataToView === 'years' && (classNames === null || classNames === void 0 ? void 0 : classNames.BodyYears)) }),
        dataToView === 'days' && (React.createElement("div", __assign({}, DaysProps, { className: classNameResolve(DaysProps === null || DaysProps === void 0 ? void 0 : DaysProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Days) }), daysDictionary.map(function (day, i) { return (React.createElement("div", __assign({}, DayProps, { key: day + i, className: classNameResolve(DayProps === null || DayProps === void 0 ? void 0 : DayProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Day) }), day)); }))),
        React.createElement("div", __assign({}, CellsProps, { className: classNameResolve(CellsProps === null || CellsProps === void 0 ? void 0 : CellsProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Cells) }),
            dataToView === 'days' && React.createElement(Days, null),
            dataToView === 'months' && React.createElement(Months, null),
            dataToView === 'years' && React.createElement(Years, null))));
}
//# sourceMappingURL=body.js.map