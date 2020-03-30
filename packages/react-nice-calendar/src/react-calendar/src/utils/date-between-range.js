export default function dateBetweenRange(startDate, endDate, testDate) {
    if (!startDate || !endDate || !testDate)
        return false;
    var startTime = startDate === null || startDate === void 0 ? void 0 : startDate.getTime();
    var endTime = endDate === null || endDate === void 0 ? void 0 : endDate.getTime();
    var testTime = testDate === null || testDate === void 0 ? void 0 : testDate.getTime();
    if (startTime === testTime || endTime === testTime) {
        return true;
    }
    if ((testTime > startTime && testTime < endTime) || (testTime < startTime && testTime > endTime)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=date-between-range.js.map