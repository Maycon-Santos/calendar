var CalendarProvider = /** @class */ (function () {
    function CalendarProvider(options) {
        var _this = this;
        this.onChange = function () { };
        this.prevMonth = function () {
            _this._dateToView.setMonth(_this._dateToView.getMonth() - 1);
            _this.onChange();
        };
        this.nextMonth = function () {
            _this._dateToView.setMonth(_this._dateToView.getMonth() + 1);
            _this.onChange();
        };
        this.prevYear = function () {
            _this._dateToView.setFullYear(_this._dateToView.getFullYear() - 1);
            _this.onChange();
        };
        this.nextYear = function () {
            _this._dateToView.setFullYear(_this._dateToView.getFullYear() + 1);
            _this.onChange();
        };
        this.prevYears = function () {
            var year = _this._dateToView.getFullYear() - (_this._backwardYears + _this._forwardYears);
            _this._dateToView.setFullYear(year);
            _this.onChange();
        };
        this.nextYears = function () {
            var year = _this._dateToView.getFullYear() + (_this._backwardYears + _this._forwardYears);
            _this._dateToView.setFullYear(year);
            _this.onChange();
        };
        this.goto = function (date) {
            _this._dateToView = date;
            _this.onChange();
        };
        var _a = options || {}, _b = _a.date, date = _b === void 0 ? new Date() : _b, _c = _a.backwardYears, backwardYears = _c === void 0 ? 8 : _c, _d = _a.forwardYears, forwardYears = _d === void 0 ? 8 : _d;
        this._dateToView = new Date(date);
        this._startDate = new Date(date);
        this._backwardYears = backwardYears;
        this._forwardYears = forwardYears;
    }
    Object.defineProperty(CalendarProvider.prototype, "backwardYears", {
        get: function () {
            return this._backwardYears;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "forwardYears", {
        get: function () {
            return this._forwardYears;
        },
        enumerable: true,
        configurable: true
    });
    CalendarProvider.prototype.resetDateToView = function () {
        this._dateToView = this._startDate;
        this.onChange();
    };
    Object.defineProperty(CalendarProvider.prototype, "dateToView", {
        get: function () {
            return this._dateToView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "month", {
        get: function () { return this._dateToView.getMonth(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "year", {
        get: function () { return this._dateToView.getFullYear(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "days", {
        get: function () {
            var days = Array(42).fill(null);
            var date = new Date(this._dateToView);
            var currentMonth = date.getMonth();
            date.setDate(1);
            var day = date.getDay();
            if (date.getDate() - day <= 0) {
                date.setDate(0);
                date.setDate(date.getDate() - day + 1);
            }
            for (var i in days) {
                days[i] = {
                    date: new Date(date),
                    day: date.getDate(),
                    belongCurrentMonth: currentMonth === date.getMonth(),
                };
                date.setDate(date.getDate() + 1);
            }
            return days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "months", {
        get: function () {
            var months = Array(12).fill(null);
            var currentMonth = new Date(this._dateToView);
            currentMonth.setDate(1);
            currentMonth.setMonth(0);
            for (var i in months) {
                months[i] = {
                    date: new Date(currentMonth),
                    month: currentMonth.getMonth(),
                };
                currentMonth.setMonth(currentMonth.getMonth() + 1);
            }
            return months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarProvider.prototype, "years", {
        get: function () {
            var years = Array(Math.abs(this._backwardYears) + this._forwardYears).fill(null);
            var currentYear = new Date(this._dateToView);
            currentYear.setDate(1);
            currentYear.setMonth(0);
            currentYear.setFullYear(currentYear.getFullYear() - this._backwardYears);
            for (var i in years) {
                years[i] = {
                    date: new Date(currentYear),
                    year: currentYear.getFullYear(),
                };
                currentYear.setFullYear(currentYear.getFullYear() + 1);
            }
            return years;
        },
        enumerable: true,
        configurable: true
    });
    return CalendarProvider;
}());
export default CalendarProvider;
//# sourceMappingURL=calendar-provider.js.map