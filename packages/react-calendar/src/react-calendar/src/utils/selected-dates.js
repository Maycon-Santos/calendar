export default function getSelectedDates(selectedDate) {
    if (Array.isArray(selectedDate)) {
        return selectedDate || [];
    }
    else if (selectedDate) {
        return [selectedDate];
    }
    return [];
}
//# sourceMappingURL=selected-dates.js.map