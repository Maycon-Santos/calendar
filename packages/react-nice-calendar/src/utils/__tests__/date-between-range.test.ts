import dateBetweenRange from '../date-between-range'

describe('dateBetweenRange', () => {
  it('should return true when the date its between range', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      new Date(1998, 4, 16),
      new Date(1998, 4, 10)
    )
    expect(diff).toBe(true)
  })

  it('should return false when the date its not between range', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      new Date(1998, 4, 10),
      new Date(1998, 4, 16)
    )
    expect(diff).toBe(false)
  })

  it('should return true when the date is equal startDate', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      new Date(1998, 4, 16),
      new Date(1998, 4, 8)
    )
    expect(diff).toBe(true)
  })

  it('should return true when the date is equal endDate', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      new Date(1998, 4, 16),
      new Date(1998, 4, 16)
    )
    expect(diff).toBe(true)
  })

  it('should return false when the startDate is invalid', () => {
    const diff = dateBetweenRange(
      null,
      new Date(1998, 4, 16),
      new Date(1998, 4, 16)
    )
    expect(diff).toBe(false)
  })

  it('should return false when the endDate is invalid', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      null,
      new Date(1998, 4, 16)
    )
    expect(diff).toBe(false)
  })

  it('should return false when the testDate is invalid', () => {
    const diff = dateBetweenRange(
      new Date(1998, 4, 8),
      new Date(1998, 4, 16),
      undefined
    )
    expect(diff).toBe(false)
  })
})
