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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useMemo, useEffect } from 'react';
import animate, { easingFunctions } from 'transition-engine';
import Calendar from '../react-calendar';
import calendarStyle from './styles/calendar.css';
export default (function (props) {
    var classNames = props.classNames, BodyProps = props.BodyProps, HeaderTextProps = props.HeaderTextProps, YearProps = props.YearProps, MonthProps = props.MonthProps, PrevButtonProps = props.PrevButtonProps, NextButtonProps = props.NextButtonProps, rest = __rest(props, ["classNames", "BodyProps", "HeaderTextProps", "YearProps", "MonthProps", "PrevButtonProps", "NextButtonProps"]);
    var bodyRefs = useMemo(function () { return []; }, []);
    useEffect(function () {
        if ((BodyProps === null || BodyProps === void 0 ? void 0 : BodyProps.ref) && typeof (BodyProps === null || BodyProps === void 0 ? void 0 : BodyProps.ref) === 'object') {
            bodyRefs.push(BodyProps.ref.current);
        }
    }, []);
    var assignedStyle = __assign(__assign({}, calendarStyle), classNames);
    var zoomAnimation = function (from, to) {
        return function (_a) {
            var originalHandler = _a.originalHandler;
            if (originalHandler) {
                animate({
                    from: from,
                    to: to,
                    duration: 100,
                    iterationCount: 2,
                    timingFunction: [easingFunctions.easeInQuad, easingFunctions.easeOutQuad],
                    transition: function (_a) {
                        var iteration = _a.iteration, value = _a.value, iterationProgress = _a.iterationProgress;
                        bodyRefs.forEach(function (bodyRef) {
                            if (bodyRef) {
                                bodyRef.style.opacity = (iteration === 1 ? iterationProgress : 1 - iterationProgress).toString();
                                bodyRef.style.transform = "scale(" + value + ")";
                            }
                        });
                    },
                    iterationChange: function (iteration) {
                        if (iteration === 1)
                            originalHandler();
                    }
                }).start();
            }
        };
    };
    var slideAnimation = function (from, to) {
        return function (_a) {
            var originalHandler = _a.originalHandler;
            if (originalHandler) {
                animate({
                    from: from,
                    to: to,
                    duration: 200,
                    iterationCount: 2,
                    timingFunction: [easingFunctions.easeInQuad, easingFunctions.easeOutQuad],
                    transition: function (_a) {
                        var iteration = _a.iteration, value = _a.value, iterationProgress = _a.iterationProgress;
                        bodyRefs.forEach(function (bodyRef) {
                            if (bodyRef) {
                                bodyRef.style.opacity = (iteration === 1 ? iterationProgress : 1 - iterationProgress).toString();
                                bodyRef.style.transform = "translateX(" + value + "px)";
                            }
                        });
                    },
                    iterationChange: function (iteration) {
                        if (iteration === 1)
                            originalHandler();
                    }
                }).start();
            }
        };
    };
    var zoomOutAnimation = zoomAnimation([1, 1.05], [0.95, 1]);
    var zooInAnimation = zoomAnimation([1, 0.95], [1.05, 1]);
    var slideToLeftAnimation = slideAnimation([0, 20], [-20, 0]);
    var slideToRightAnimation = slideAnimation([0, -20], [20, 0]);
    var onClickHandler = function (handler, componentProps) {
        return function (event) {
            var originalEvent = event.originalEvent, originalHandler = event.originalHandler;
            if (componentProps === null || componentProps === void 0 ? void 0 : componentProps.onClick) {
                componentProps.onClick({
                    originalEvent: originalEvent,
                    originalHandler: originalHandler && (function () { return handler({ originalEvent: originalEvent, originalHandler: originalHandler }); })
                });
            }
            else {
                handler({ originalEvent: originalEvent, originalHandler: originalHandler });
            }
        };
    };
    return (React.createElement(Calendar, __assign({}, rest, { classNames: assignedStyle, BodyProps: {
            ref: typeof (BodyProps === null || BodyProps === void 0 ? void 0 : BodyProps.ref) === 'object' ? BodyProps.ref : function (ref) {
                if (ref && !bodyRefs.includes(ref)) {
                    bodyRefs.push(ref);
                }
                if (typeof (BodyProps === null || BodyProps === void 0 ? void 0 : BodyProps.ref) === 'function') {
                    BodyProps.ref(ref);
                }
            }
        }, HeaderTextProps: {
            onClick: zoomOutAnimation
        }, YearProps: __assign(__assign({}, YearProps), { onClick: onClickHandler(zooInAnimation, YearProps) }), MonthProps: __assign(__assign({}, MonthProps), { onClick: onClickHandler(zooInAnimation, MonthProps) }), PrevButtonProps: __assign(__assign({}, PrevButtonProps), { onClick: onClickHandler(slideToRightAnimation, PrevButtonProps) }), NextButtonProps: __assign(__assign({}, NextButtonProps), { onClick: onClickHandler(slideToLeftAnimation, NextButtonProps) }) })));
});
//# sourceMappingURL=calendar.js.map