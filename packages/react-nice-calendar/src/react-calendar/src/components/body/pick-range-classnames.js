var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import dateBetweenRange from '../../utils/date-between-range';
import dateDiff from '../../utils/date-diff';
import dateSort from '../../utils/date-sort';
import excludeEqualDates from '../../utils/exclude-equal-dates';
export default function getPickRangeClassNames(params) {
    var _a, _b;
    var selectedDates = params.selectedDates, dateMouseOver = params.dateMouseOver, date = params.date, rangeSize = params.rangeSize, isInvalidDate = params.isInvalidDate, classNames = params.classNames;
    var selectedDatesSize = selectedDates.length;
    var range = excludeEqualDates(selectedDates[0], selectedDates[1] || dateMouseOver);
    var hasRange = range.length === 2;
    var inBetweenRange = selectedDatesSize > 0 && dateBetweenRange.apply(void 0, __spreadArrays(excludeEqualDates(selectedDates[0], dateMouseOver), [date]));
    var inBetweenSelectedRange = selectedDatesSize === 2 && dateBetweenRange(selectedDates[0], selectedDates[1], date);
    var isInvalidRangeDate = isInvalidDate && (inBetweenRange || inBetweenSelectedRange);
    // Get diff between dates
    var rangeDiff = selectedDates[0] ? dateDiff(selectedDates[0], date) : 0;
    var rangeDiffAbs = rangeDiff && Math.abs(rangeDiff);
    // Check if is between under minRange
    var mouseUnderMinRange = selectedDates[0] && dateMouseOver && Math.abs(dateDiff(selectedDates[0], dateMouseOver)) < rangeSize.min;
    var isUnderMinRange = inBetweenRange && mouseUnderMinRange && rangeDiffAbs < rangeSize.min;
    // Check if is between over minRange
    var isOverMaxRange = inBetweenRange && rangeDiffAbs > rangeSize.max;
    var mouseOver = (dateMouseOver === null || dateMouseOver === void 0 ? void 0 : dateMouseOver.toLocaleDateString()) === date.toLocaleDateString();
    // Check if is start or end date of the range
    var orderRangeDate = dateSort.apply(void 0, excludeEqualDates(selectedDates[0], selectedDates[1] || dateMouseOver));
    var isStartRangeDate = hasRange && ((_a = orderRangeDate === null || orderRangeDate === void 0 ? void 0 : orderRangeDate[0]) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) === date.toLocaleDateString();
    var isEndRangeDate = hasRange && ((_b = orderRangeDate === null || orderRangeDate === void 0 ? void 0 : orderRangeDate[1]) === null || _b === void 0 ? void 0 : _b.toLocaleDateString()) === date.toLocaleDateString();
    return [
        inBetweenRange && (classNames === null || classNames === void 0 ? void 0 : classNames.BetweenRange),
        inBetweenSelectedRange && (classNames === null || classNames === void 0 ? void 0 : classNames.BetweenSelectedRange),
        isUnderMinRange && (classNames === null || classNames === void 0 ? void 0 : classNames.UnderMinRange),
        isOverMaxRange && (classNames === null || classNames === void 0 ? void 0 : classNames.OverMaxRange),
        isInvalidRangeDate && (classNames === null || classNames === void 0 ? void 0 : classNames.InvalidRangeDate),
        isStartRangeDate && (classNames === null || classNames === void 0 ? void 0 : classNames.StartRangeDate),
        isEndRangeDate && (classNames === null || classNames === void 0 ? void 0 : classNames.EndRangeDate),
        mouseOver && (classNames === null || classNames === void 0 ? void 0 : classNames.MouseOverEndRange),
    ];
}
//# sourceMappingURL=pick-range-classnames.js.map