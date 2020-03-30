export default (function (date1, date2) {
    var date1UTC = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var date2UTC = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((date2UTC - date1UTC) / (1000 * 60 * 60 * 24));
});
//# sourceMappingURL=date-diff.js.map