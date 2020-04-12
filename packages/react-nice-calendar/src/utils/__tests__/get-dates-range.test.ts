import getDatesRange from '../get-dates-range'

describe('getDatesRange', () => {
  it('should return all dates between range', () => {
    const range = getDatesRange(new Date(1998, 4, 8), new Date(1998, 4, 16))
    expect(range).toEqual([
      new Date(1998, 4, 8),
      new Date(1998, 4, 9),
      new Date(1998, 4, 10),
      new Date(1998, 4, 11),
      new Date(1998, 4, 12),
      new Date(1998, 4, 13),
      new Date(1998, 4, 14),
      new Date(1998, 4, 15),
      new Date(1998, 4, 16)
    ])
  })
})
