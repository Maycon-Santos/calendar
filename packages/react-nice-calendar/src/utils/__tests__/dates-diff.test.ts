import datesDiff from '../dates-diff'

describe('datesDiff', () => {
  it('should return difference in days between dates (positive)', () => {
    const diff = datesDiff(new Date(1998, 4, 8), new Date(1998, 4, 16))
    expect(diff).toBe(8)
  })

  it('should return difference in days between dates (negative)', () => {
    const diff = datesDiff(new Date(1998, 4, 16), new Date(1998, 4, 8))
    expect(diff).toBe(-8)
  })
})
