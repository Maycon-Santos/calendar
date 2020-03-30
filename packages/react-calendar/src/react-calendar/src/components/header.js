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
import React, { useContext } from 'react';
import { CalendarContext } from "../context";
import useProps from '../hooks/use-props';
import classNameResolve from '../utils/classname-resolve';
import customOnClick from '../utils/onclick-handler';
function PrevButton(props) {
    var onClick = props.onClick;
    var _a = useProps(), classNames = _a.classNames, PrevButtonProps = _a.PrevButtonProps;
    return (React.createElement("button", __assign({}, PrevButtonProps, { type: "button", onClick: customOnClick(onClick, PrevButtonProps === null || PrevButtonProps === void 0 ? void 0 : PrevButtonProps.onClick), className: classNameResolve(PrevButtonProps === null || PrevButtonProps === void 0 ? void 0 : PrevButtonProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.PrevButton) })));
}
function NextButton(props) {
    var onClick = props.onClick;
    var _a = useProps(), classNames = _a.classNames, NextButtonProps = _a.NextButtonProps;
    return (React.createElement("button", __assign({}, NextButtonProps, { type: "button", onClick: customOnClick(onClick, NextButtonProps === null || NextButtonProps === void 0 ? void 0 : NextButtonProps.onClick), className: classNameResolve(NextButtonProps === null || NextButtonProps === void 0 ? void 0 : NextButtonProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.NextButton) })));
}
function HeaderText(props) {
    var children = props.children, onClick = props.onClick;
    var _a = useProps(), classNames = _a.classNames, HeaderTextProps = _a.HeaderTextProps;
    return (React.createElement("button", __assign({}, HeaderTextProps, { type: "button", onClick: customOnClick(onClick, HeaderTextProps === null || HeaderTextProps === void 0 ? void 0 : HeaderTextProps.onClick), className: classNameResolve(HeaderTextProps === null || HeaderTextProps === void 0 ? void 0 : HeaderTextProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.HeaderText) }), children));
}
function Month() {
    var _a = useContext(CalendarContext), emitEvent = _a.emitEvent, calendarProvider = _a.calendarProvider;
    var monthsDictionary = useProps().monthsDictionary;
    return (React.createElement(React.Fragment, null,
        React.createElement(PrevButton, { onClick: function () { return emitEvent('calendar.prevMonth'); } }),
        React.createElement(HeaderText, { onClick: function () { return emitEvent('setDataToView', 'months'); } },
            monthsDictionary[calendarProvider.month],
            " - ",
            calendarProvider.year),
        React.createElement(NextButton, { onClick: function () { return emitEvent('calendar.nextMonth'); } })));
}
function Year() {
    var _a = useContext(CalendarContext), emitEvent = _a.emitEvent, calendarProvider = _a.calendarProvider;
    return (React.createElement(React.Fragment, null,
        React.createElement(PrevButton, { onClick: function () { return emitEvent('calendar.prevYear'); } }),
        React.createElement(HeaderText, { onClick: function () { return emitEvent('setDataToView', 'years'); } }, calendarProvider.year),
        React.createElement(NextButton, { onClick: function () { return emitEvent('calendar.nextYear'); } })));
}
function YearsRange() {
    var _a = useContext(CalendarContext), calendarProvider = _a.calendarProvider, emitEvent = _a.emitEvent;
    var years = calendarProvider.years;
    return (React.createElement(React.Fragment, null,
        React.createElement(PrevButton, { onClick: function () { return emitEvent('calendar.prevYears'); } }),
        React.createElement(HeaderText, null,
            years[0].year,
            " - ",
            years[years.length - 1].year),
        React.createElement(NextButton, { onClick: function () { return emitEvent('calendar.nextYears'); } })));
}
export default function Header() {
    var dataToView = useContext(CalendarContext).dataToView;
    var _a = useProps(), classNames = _a.classNames, HeaderProps = _a.HeaderProps;
    return (React.createElement("header", __assign({ className: classNameResolve(HeaderProps === null || HeaderProps === void 0 ? void 0 : HeaderProps.className, classNames === null || classNames === void 0 ? void 0 : classNames.Header, dataToView === 'days' && (classNames === null || classNames === void 0 ? void 0 : classNames.HeaderMonth), dataToView === 'months' && (classNames === null || classNames === void 0 ? void 0 : classNames.HeaderYear), dataToView === 'years' && (classNames === null || classNames === void 0 ? void 0 : classNames.HeaderYearsRange)) }, HeaderProps),
        dataToView === 'days' && React.createElement(Month, null),
        dataToView === 'months' && React.createElement(Year, null),
        dataToView === 'years' && React.createElement(YearsRange, null)));
}
//# sourceMappingURL=header.js.map