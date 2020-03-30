import dateDiff from "./date-diff";
export default function getDatesRange(date1, date2) {
    var rangeDiff = dateDiff(date1, date2);
    var rangeDiffAbs = Math.abs(rangeDiff);
    var date = new Date(date1);
    var dates = [new Date(date)];
    for (var i = 0; i < rangeDiffAbs; i++) {
        date.setDate(date.getDate() + (rangeDiff / rangeDiffAbs));
        dates.push(new Date(date));
    }
    return dates;
}
//# sourceMappingURL=get-dates-range.js.map