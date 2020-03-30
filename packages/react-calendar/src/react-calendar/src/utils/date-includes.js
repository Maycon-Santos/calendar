export default function dateIncludes(arr, date) {
    var dateString = date.toLocaleDateString();
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var _date = arr_1[_i];
        if (_date.toLocaleDateString() === dateString) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=date-includes.js.map