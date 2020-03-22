export default function getSelectedDates (selectedDate: undefined | null | Date | Date[]): Date[] {
  if (Array.isArray(selectedDate)) {
    return selectedDate || []
  } else if (selectedDate) {
    return [selectedDate]
  }

  return []
}