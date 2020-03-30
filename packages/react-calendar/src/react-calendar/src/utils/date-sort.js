export default (function () {
    var dateList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dateList[_i] = arguments[_i];
    }
    var sanitizedDateList = dateList.filter(Boolean);
    return sanitizedDateList.sort(function (a, b) { return a.getTime() - b.getTime(); });
});
//# sourceMappingURL=date-sort.js.map