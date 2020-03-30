var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useMemo, useState } from 'react';
import CalendarProvider from '../../calendar-provider/src/calendar-provider';
import Body from './components/body';
import Header from './components/header';
import { CalendarContext } from './context';
import useBindConsumer from './hooks/use-bind-consumer';
import useDispatcher from './hooks/use-dispatcher';
import useForceUpdate from './hooks/use-force-update';
import useWillMount from './hooks/use-will-mount';
export default (function (props) {
    var classNames = props.classNames, startDate = props.startDate;
    var _a = useState('days'), dataToView = _a[0], setDataToView = _a[1];
    var _b = useState(null), dateMouseOver = _b[0], setDateMouseOver = _b[1];
    var calendarProvider = useMemo(function () { return new CalendarProvider({ date: startDate }); }, []);
    var bind = useBindConsumer({
        props: props,
        shared: {
            mainCalendarProvider: calendarProvider,
            dispatchers: []
        }
    });
    var dispatcher = useDispatcher({
        bind: bind,
        calendarProvider: calendarProvider,
        setDateMouseOver: setDateMouseOver,
        setDataToView: setDataToView,
    });
    var emitEvent = function (type) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _a;
        var dispatchers = ((_a = bind.shared) === null || _a === void 0 ? void 0 : _a.dispatchers) || [dispatcher];
        dispatchers.forEach(function (dispatcher) { return dispatcher.apply(void 0, __spreadArrays([type], params)); });
    };
    useWillMount(function () { return bind.order && dispatcher('setDataToView', dataToView); });
    calendarProvider.onChange = useForceUpdate();
    return (React.createElement(CalendarContext.Provider, { value: {
            emitEvent: emitEvent,
            dataToView: dataToView,
            calendarProvider: calendarProvider,
            dateMouseOver: dateMouseOver,
            bind: bind,
        } },
        React.createElement("div", { className: classNames === null || classNames === void 0 ? void 0 : classNames.Container },
            React.createElement(Header, null),
            React.createElement(Body, null))));
});
//# sourceMappingURL=react-calendar.js.map