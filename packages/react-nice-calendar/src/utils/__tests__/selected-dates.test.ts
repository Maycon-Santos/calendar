import getSelectedDates from '../selected-dates'

describe('getSelectedDates', () => {
  it('should return an array of date when call with a date', () => {
    const selectedDates = getSelectedDates(new Date(1998, 4, 8))
    expect(selectedDates).toEqual([new Date(1998, 4, 8)])
  })

  it('should return an array of date when call with an array of dates', () => {
    const selectedDates = getSelectedDates([
      new Date(1998, 4, 8),
      new Date(1998, 4, 9)
    ])
    expect(selectedDates).toEqual([new Date(1998, 4, 8), new Date(1998, 4, 9)])
  })

  it('should return an empty array when call with null', () => {
    const selectedDates = getSelectedDates(null)
    expect(selectedDates).toEqual([])
  })
})
