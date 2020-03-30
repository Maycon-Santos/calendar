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
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../react-calendar';
import classNames from './classNames';
describe('<Calendar />', function () {
    var Component = function (props) {
        var _a = useState(), selectedDate = _a[0], setSelectedDate = _a[1];
        console.log(selectedDate);
        return (React.createElement(Calendar, __assign({}, props, { classNames: classNames, selectedDate: selectedDate, onChangeSelectedDate: setSelectedDate })));
    };
    it('should pick one date', function () {
        var getByText = render(React.createElement(Component, null)).getByText;
        var day15 = getByText('15');
        fireEvent.click(day15);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
    });
    it('should pick multiple dates', function () {
        var getByText = render(React.createElement(Component, { pick: 'multiple' })).getByText;
        var day15 = getByText('15');
        var day17 = getByText('17');
        var day20 = getByText('20');
        fireEvent.click(day15);
        fireEvent.click(day17);
        fireEvent.click(day20);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day17.classList.contains('SelectedDate')).toBe(true);
        expect(day20.classList.contains('SelectedDate')).toBe(true);
    });
    it('should pick multiple dates with limit', function () {
        var getByText = render(React.createElement(Component, { pick: 'multiple', pickLimit: 2 })).getByText;
        var day15 = getByText('15');
        var day17 = getByText('17');
        var day20 = getByText('20');
        fireEvent.click(day15);
        fireEvent.click(day17);
        fireEvent.click(day20);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day17.classList.contains('SelectedDate')).toBe(true);
        expect(day20.classList.contains('SelectedDate')).toBe(false);
    });
    it('should pick a range of dates', function () {
        var getByText = render(React.createElement(Component, { pick: 'range' })).getByText;
        var day15 = getByText('15');
        var day16 = getByText('16');
        var day17 = getByText('17');
        var day18 = getByText('18');
        var day19 = getByText('19');
        var day20 = getByText('20');
        fireEvent.click(day15);
        fireEvent.click(day20);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day16.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day17.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day18.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day19.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day20.classList.contains('SelectedDate')).toBe(true);
    });
    it('should change class of the dates between range', function () {
        var getByText = render(React.createElement(Component, { pick: 'range' })).getByText;
        var day15 = getByText('15');
        var day16 = getByText('16');
        var day17 = getByText('17');
        var day18 = getByText('18');
        var day19 = getByText('19');
        var day20 = getByText('20');
        fireEvent.click(day15);
        fireEvent.mouseEnter(day20);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day16.classList.contains('BetweenRange')).toBe(true);
        expect(day17.classList.contains('BetweenRange')).toBe(true);
        expect(day18.classList.contains('BetweenRange')).toBe(true);
        expect(day19.classList.contains('BetweenRange')).toBe(true);
        expect(day20.classList.contains('BetweenRange')).toBe(true);
    });
    it('should pick a range of dates with limit', function () {
        var getByText = render(React.createElement(Component, { pick: 'range', rangeSize: { min: 3, max: 5 } })).getByText;
        var day15 = getByText('15');
        var day16 = getByText('16');
        var day17 = getByText('17');
        var day18 = getByText('18');
        var day19 = getByText('19');
        var day20 = getByText('20');
        fireEvent.click(day15);
        fireEvent.click(day17);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day16.classList.contains('BetweenSelectedRange')).toBe(false);
        expect(day17.classList.contains('BetweenSelectedRange')).toBe(false);
        expect(day18.classList.contains('BetweenSelectedRange')).toBe(false);
        expect(day19.classList.contains('BetweenSelectedRange')).toBe(false);
        expect(day20.classList.contains('SelectedDate')).toBe(false);
        fireEvent.click(day20);
        expect(day15.classList.contains('SelectedDate')).toBe(true);
        expect(day16.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day17.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day18.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day19.classList.contains('BetweenSelectedRange')).toBe(true);
        expect(day20.classList.contains('SelectedDate')).toBe(true);
    });
    it('shoud go to months', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        fireEvent.click(getByTitle('Header'));
        expect(container).toMatchSnapshot();
    });
    it('shoud go to years range', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        fireEvent.click(getByTitle('Header'));
        fireEvent.click(getByTitle('Header'));
        expect(container).toMatchSnapshot();
    });
    it('should go to next month', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, NextButtonProps: { title: 'Next' } })), getByTitle = _a.getByTitle, container = _a.container;
        var nextButton = getByTitle('Next');
        fireEvent.click(nextButton);
        expect(container).toMatchSnapshot();
    });
    it('should go to prev month', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, PrevButtonProps: { title: 'Prev' } })), getByTitle = _a.getByTitle, container = _a.container;
        var prevButton = getByTitle('Prev');
        fireEvent.click(prevButton);
        expect(container).toMatchSnapshot();
    });
    it('should go to next year', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, NextButtonProps: { title: 'Next' }, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        var nextButton = getByTitle('Next');
        fireEvent.click(getByTitle('Header'));
        fireEvent.click(nextButton);
        expect(container).toMatchSnapshot();
    });
    it('should go to prev year', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, PrevButtonProps: { title: 'Prev' }, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        fireEvent.click(getByTitle('Header'));
        var prevButton = getByTitle('Prev');
        fireEvent.click(prevButton);
        expect(container).toMatchSnapshot();
    });
    it('should go to next year range', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, NextButtonProps: { title: 'Next' }, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        var nextButton = getByTitle('Next');
        fireEvent.click(getByTitle('Header'));
        fireEvent.click(getByTitle('Header'));
        fireEvent.click(nextButton);
        expect(container).toMatchSnapshot();
    });
    it('should go to prev year range', function () {
        var startDate = new Date(1998, 5, 8);
        var _a = render(React.createElement(Component, { startDate: startDate, PrevButtonProps: { title: 'Prev' }, HeaderTextProps: { title: 'Header' } })), getByTitle = _a.getByTitle, container = _a.container;
        fireEvent.click(getByTitle('Header'));
        fireEvent.click(getByTitle('Header'));
        var prevButton = getByTitle('Prev');
        fireEvent.click(prevButton);
        expect(container).toMatchSnapshot();
    });
    it('should render months of the monthsDictionary', function () {
        var startDate = new Date(1998, 0, 8);
        var monthsDictionary = [
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
        ];
        var _a = render(React.createElement(Component, { startDate: startDate, monthsDictionary: monthsDictionary, NextButtonProps: { title: 'Next' } })), getByText = _a.getByText, getByTitle = _a.getByTitle;
        for (var i = 0; i < 12; i++) {
            expect(getByText(new RegExp(monthsDictionary[i]))).toBeInTheDocument();
            fireEvent.click(getByTitle('Next'));
        }
    });
    it('should render days of the daysDictionary', function () {
        var startDate = new Date(1998, 0, 8);
        var daysDictionary = [
            'Sunday',
            'Monday',
            'Tuesday',
            'fourth',
            'fifth',
            'Friday',
            'Saturday'
        ];
        var getByText = render(React.createElement(Component, { startDate: startDate, daysDictionary: daysDictionary })).getByText;
        for (var i = 0; i < 7; i++) {
            expect(getByText(daysDictionary[i])).toBeInTheDocument();
        }
    });
    it('should disable invalid dates with pick single', function () {
        var startDate = new Date(1998, 5, 8);
        var getByText = render(React.createElement(Component, { startDate: startDate, filterInvalidDates: function (date) { return date.getDate() === 15; } })).getByText;
        var day15 = getByText('15');
        fireEvent.click(day15);
        expect(day15.classList.contains('SelectedDate')).toBe(false);
    });
    it('should disable invalid dates with pick multiple', function () {
        var startDate = new Date(1998, 5, 8);
        var getByText = render(React.createElement(Component, { pick: 'multiple', startDate: startDate, filterInvalidDates: function (date) { return date.getDate() === 15; } })).getByText;
        var day15 = getByText('15');
        fireEvent.click(day15);
        expect(day15.classList.contains('SelectedDate')).toBe(false);
    });
    it('should disable invalid dates with pick range', function () {
        var startDate = new Date(1998, 5, 8);
        var getByText = render(React.createElement(Component, { pick: 'range', startDate: startDate, filterInvalidDates: function (date) { return date.getDate() === 15; } })).getByText;
        var day14 = getByText('14');
        var day15 = getByText('15');
        var day16 = getByText('16');
        fireEvent.click(day14);
        fireEvent.click(day16);
        expect(day14.classList.contains('SelectedDate')).toBe(true);
        expect(day15.classList.contains('BetweenRange')).toBe(false);
        expect(day15.classList.contains('BetweenSelectedRange')).toBe(false);
    });
});
//# sourceMappingURL=react-calendar.test.js.map