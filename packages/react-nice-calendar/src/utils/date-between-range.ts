export default function dateBetweenRange (
  startDate?: Date | null,
  endDate?: Date | null,
  testDate?: Date
) {
  if (!startDate || !endDate || !testDate) return false

  const startTime = startDate.getTime()
  const endTime = endDate.getTime()
  const testTime = testDate.getTime()

  if (startTime === testTime || endTime === testTime) {
    return true
  }

  if (
    (testTime > startTime && testTime < endTime) ||
    (testTime < startTime && testTime > endTime)
  ) {
    return true
  }

  return false
}
