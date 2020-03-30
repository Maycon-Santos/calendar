export default (function () {
    var dateList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dateList[_i] = arguments[_i];
    }
    var sanitizedDateList = dateList.filter(Boolean);
    return sanitizedDateList
        .map(function (date) { return date.getTime(); })
        .filter(function (date, i, arr) { return arr.indexOf(date) === i; })
        .map(function (time) { return new Date(time); });
});
//# sourceMappingURL=exclude-equal-dates.js.map