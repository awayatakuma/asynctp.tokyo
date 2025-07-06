describe('Jest setup test', () => {
  it('should pass basic test', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle arrays', () => {
    const numbers = [1, 2, 3]
    expect(numbers).toHaveLength(3)
    expect(numbers).toContain(2)
  })
})