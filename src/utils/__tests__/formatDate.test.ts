import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  it('should format date object correctly', () => {
    const date = new Date('2023-12-25T10:30:00Z')
    const result = formatDate(date)
    expect(result).toBe('December 25, 2023')
  })

  it('should format date string correctly', () => {
    const dateString = '2023-06-15T00:00:00Z'
    const result = formatDate(dateString)
    expect(result).toBe('June 15, 2023')
  })

  it('should handle ISO date string', () => {
    const isoString = '2024-01-01T12:00:00.000Z'
    const result = formatDate(isoString)
    expect(result).toBe('January 1, 2024')
  })

  it('should handle date-only string', () => {
    const dateOnly = '2023-03-10'
    const result = formatDate(dateOnly)
    expect(result).toBe('March 10, 2023')
  })

  it('should use US locale format', () => {
    const date = new Date('2023-02-28T00:00:00Z')
    const result = formatDate(date)
    expect(result).toBe('February 28, 2023')
  })

  it('should handle leap year dates', () => {
    const leapYearDate = new Date('2024-02-29T00:00:00Z')
    const result = formatDate(leapYearDate)
    expect(result).toBe('February 29, 2024')
  })

  it('should handle year boundaries', () => {
    const newYear = new Date('2023-01-01T00:00:00Z')
    const result = formatDate(newYear)
    expect(result).toBe('January 1, 2023')
  })
})
