var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import dateDiff from './utils/date-diff';
import dateSort from './utils/date-sort';
import getDatesRange from './utils/get-dates-range';
import getSelectedDates from './utils/selected-dates';
import { defaultProps } from './hooks/use-props';
export default function dispatcherFactory(data) {
    var calendarProvider = data.calendarProvider, setDateMouseOver = data.setDateMouseOver, setDataToView = data.setDataToView, _a = data.bind, order = _a.order, shared = _a.shared, props = _a.props, _b = _a.props, onChangeSelectedDate = _b.onChangeSelectedDate, filterInvalidDates = _b.filterInvalidDates;
    function emitSelectedDateEvent(date) {
        return onChangeSelectedDate && onChangeSelectedDate(date);
    }
    function setSingleDate(value) {
        emitSelectedDateEvent(value);
    }
    function setMultipleDate(value) {
        var pickLimit = (props === null || props === void 0 ? void 0 : props.pickLimit) || defaultProps.pickLimit;
        var selectedDates = getSelectedDates(props === null || props === void 0 ? void 0 : props.selectedDate);
        if (selectedDates.length < pickLimit) {
            emitSelectedDateEvent(dateSort.apply(void 0, __spreadArrays(selectedDates, [value])));
        }
    }
    function setRangeDate(value) {
        var selectedDates = getSelectedDates(props === null || props === void 0 ? void 0 : props.selectedDate);
        var rangeSize = (props === null || props === void 0 ? void 0 : props.rangeSize) || defaultProps.rangeSize;
        switch (selectedDates.length) {
            case 0: {
                emitSelectedDateEvent([value]);
                break;
            }
            case 1: {
                var rangeDiff = dateDiff(selectedDates[0], value);
                var rangeDiffAbs = Math.abs(rangeDiff);
                var datesRange = getDatesRange(selectedDates[0], value);
                var isValid = !filterInvalidDates || (datesRange.filter(function (date) { return filterInvalidDates(date); }).length === 0);
                if (isValid && (rangeDiffAbs >= rangeSize.min && rangeDiffAbs <= rangeSize.max)) {
                    emitSelectedDateEvent(dateSort.apply(void 0, __spreadArrays(selectedDates, [value])));
                    break;
                }
            }
        }
    }
    function addSelectedDateHandler(date) {
        var pick = (props === null || props === void 0 ? void 0 : props.pick) || defaultProps.pick;
        var methods = {
            single: setSingleDate,
            multiple: setMultipleDate,
            range: setRangeDate,
        };
        methods[pick](date);
    }
    function removeSelectedDate(value) {
        var pick = (props === null || props === void 0 ? void 0 : props.pick) || defaultProps.pick;
        if (pick === 'single') {
            emitSelectedDateEvent(null);
        }
        else {
            var selectedDates = getSelectedDates(props === null || props === void 0 ? void 0 : props.selectedDate);
            var clonedSelectedDates = __spreadArrays(selectedDates);
            var formattedDates = selectedDates.map(function (d) { return d.toLocaleDateString(); });
            clonedSelectedDates.splice(formattedDates.indexOf(value.toLocaleDateString()), 1);
            emitSelectedDateEvent(dateSort.apply(void 0, clonedSelectedDates));
        }
    }
    function setDataToViewHandler(value) {
        if (order > 0) {
            if (!shared || !order || !(shared === null || shared === void 0 ? void 0 : shared.mainCalendarProvider))
                return;
            var mainCalendarProvider = shared.mainCalendarProvider;
            var backwardYears = mainCalendarProvider.backwardYears, forwardYears = mainCalendarProvider.forwardYears;
            var date = new Date(mainCalendarProvider.dateToView);
            if (value === 'days') {
                date.setMonth(date.getMonth() + order);
                calendarProvider.goto(date);
            }
            if (value === 'months') {
                date.setFullYear(date.getFullYear() + order);
                calendarProvider.goto(date);
            }
            if (value === 'years') {
                var years = mainCalendarProvider.years;
                date.setFullYear(years[backwardYears].date.getFullYear() +
                    (backwardYears + forwardYears) * order);
                calendarProvider.goto(date);
            }
        }
        setDataToView(value);
    }
    var events = {
        'calendar.prevMonth': calendarProvider.prevMonth,
        'calendar.nextMonth': calendarProvider.nextMonth,
        'calendar.prevYear': calendarProvider.prevYear,
        'calendar.nextYear': calendarProvider.nextYear,
        'calendar.prevYears': calendarProvider.prevYears,
        'calendar.nextYears': calendarProvider.nextYears,
        'calendar.goto': calendarProvider.goto,
        'calendar.addSelectedDate': addSelectedDateHandler,
        'calendar.removeSelectedDate': removeSelectedDate,
        'setDateMouseOver': setDateMouseOver,
        'setDataToView': setDataToViewHandler,
    };
    return function (eventType) {
        var eventValue = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            eventValue[_i - 1] = arguments[_i];
        }
        return events[eventType].apply(events, eventValue);
    };
}
//# sourceMappingURL=dispatcher-factory.js.map