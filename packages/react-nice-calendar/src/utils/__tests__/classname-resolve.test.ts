import classNameResolve from '../classname-resolve'

describe('classNameResolve', () => {
  it('should return a valid className', () => {
    const className = classNameResolve('className1', undefined, null, false, 'className2')
    expect(className).toBe('className1 className2')
  })
})
