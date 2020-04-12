import excludeEqualDates from '../exclude-equal-dates'

describe('excludeEqualDates', () => {
  it('should return a list of dates without repeating', () => {
    const dates = excludeEqualDates(new Date(1998, 4, 8), new Date(1998, 4, 8), new Date(1998, 5, 8), new Date(1998, 5, 8))
    expect(dates).toEqual([new Date(1998, 4, 8), new Date(1998, 5, 8)])
  })
})
