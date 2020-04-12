import compareDates from '../compare-dates'

describe('compareDates', () => {
  it('should return true when the dates are the same', () => {
    expect(compareDates(new Date(1998, 4, 8, 3), new Date(1998, 4, 8, 5))).toBe(true)
  })

  it('should return false when the dates are different', () => {
    expect(compareDates(new Date(1998, 4, 9, 3), new Date(1998, 4, 8, 5))).toBe(false)
  })

  it('should return false when have a null between the dates', () => {
    expect(compareDates(new Date(1998, 4, 9, 3), null, new Date(1998, 4, 8, 5))).toBe(false)
  })
})
