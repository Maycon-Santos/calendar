export default function compareDates() {
    var dates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dates[_i] = arguments[_i];
    }
    var datesSet = new Set(dates.map(function (date) { return date === null || date === void 0 ? void 0 : date.toLocaleDateString(); }));
    return datesSet.size === 1;
}
//# sourceMappingURL=compare-dates.js.map