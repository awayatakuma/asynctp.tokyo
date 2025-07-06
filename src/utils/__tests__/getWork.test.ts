import { formatDate } from '@/utils/formatDate'
import { getFilename } from '@/utils/getFilename'
import { getMarkdownContent } from '@/utils/getMarkdownContent'
import { getWork } from '@/utils/getWork'

jest.mock('@/utils/formatDate')
jest.mock('@/utils/getFilename')
jest.mock('@/utils/getMarkdownContent')
jest.mock('@/constants', () => ({
  WORKS_PATH: '/works/',
}))

const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>
const mockGetFilename = getFilename as jest.MockedFunction<typeof getFilename>
const mockGetMarkdownContent = getMarkdownContent as jest.MockedFunction<
  typeof getMarkdownContent
>

describe('getWork', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process work file and return Work object', () => {
    const mockFilepath = '/path/to/works/my-project.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'My Amazing Project',
        date: '2023-12-25',
      },
      content: '# My Amazing Project\n\nThis is the description of my project.',
    })

    mockGetFilename.mockReturnValue('my-project')
    mockFormatDate.mockReturnValue('December 25, 2023')

    const result = getWork(mockFilepath)

    expect(mockGetMarkdownContent).toHaveBeenCalledWith(mockFilepath)
    expect(mockGetFilename).toHaveBeenCalledWith(mockFilepath)
    expect(mockFormatDate).toHaveBeenCalledWith('2023-12-25')

    expect(result).toEqual({
      metadatum: {
        uri: '/works/my-project',
        title: 'My Amazing Project',
        date: 'December 25, 2023',
      },
      content: '# My Amazing Project\n\nThis is the description of my project.',
    })
  })

  it('should handle different date formats', () => {
    const mockFilepath = '/path/to/works/date-project.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Date Project',
        date: '2023-01-15T10:30:00Z',
      },
      content: 'Project with ISO date',
    })

    mockGetFilename.mockReturnValue('date-project')
    mockFormatDate.mockReturnValue('January 15, 2023')

    const result = getWork(mockFilepath)

    expect(mockFormatDate).toHaveBeenCalledWith('2023-01-15T10:30:00Z')
    expect(result.metadatum.date).toBe('January 15, 2023')
  })

  it('should construct correct URI using WORKS_PATH and filename', () => {
    const mockFilepath = '/different/path/to/awesome-work.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Awesome Work',
        date: '2023-06-10',
      },
      content: 'Awesome work content',
    })

    mockGetFilename.mockReturnValue('awesome-work')
    mockFormatDate.mockReturnValue('June 10, 2023')

    const result = getWork(mockFilepath)

    expect(result.metadatum.uri).toBe('/works/awesome-work')
  })

  it('should handle MDX files', () => {
    const mockFilepath = '/path/to/works/interactive-project.mdx'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Interactive Project',
        date: '2023-09-20',
      },
      content: 'MDX content with components',
    })

    mockGetFilename.mockReturnValue('interactive-project')
    mockFormatDate.mockReturnValue('September 20, 2023')

    const result = getWork(mockFilepath)

    expect(result.metadatum.title).toBe('Interactive Project')
    expect(result.content).toBe('MDX content with components')
  })

  it('should handle works with minimal frontmatter', () => {
    const mockFilepath = '/path/to/works/simple-work.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Simple Work',
        date: '2023-03-01',
      },
      content: 'Simple work description',
    })

    mockGetFilename.mockReturnValue('simple-work')
    mockFormatDate.mockReturnValue('March 1, 2023')

    const result = getWork(mockFilepath)

    expect(result.metadatum.title).toBe('Simple Work')
    expect(result.metadatum.date).toBe('March 1, 2023')
    expect(result.metadatum.uri).toBe('/works/simple-work')
    expect(result.content).toBe('Simple work description')
  })

  it('should pass through frontmatter data correctly', () => {
    const mockFilepath = '/path/to/works/complex-project.md'

    const frontmatterData = {
      title: 'Complex Project',
      date: '2023-11-30',
    }

    mockGetMarkdownContent.mockReturnValue({
      data: frontmatterData,
      content: 'Complex project details and implementation notes.',
    })

    mockGetFilename.mockReturnValue('complex-project')
    mockFormatDate.mockReturnValue('November 30, 2023')

    const result = getWork(mockFilepath)

    expect(result.metadatum.title).toBe(frontmatterData.title)
    expect(result.content).toBe(
      'Complex project details and implementation notes.'
    )
  })

  it('should handle long file paths correctly', () => {
    const mockFilepath =
      '/very/long/nested/directory/structure/for/works/portfolio-website.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Portfolio Website',
        date: '2023-07-15',
      },
      content: 'My personal portfolio website built with Next.js',
    })

    mockGetFilename.mockReturnValue('portfolio-website')
    mockFormatDate.mockReturnValue('July 15, 2023')

    const result = getWork(mockFilepath)

    expect(mockGetFilename).toHaveBeenCalledWith(mockFilepath)
    expect(result.metadatum.uri).toBe('/works/portfolio-website')
  })

  it('should handle different filename cases', () => {
    const mockFilepath = '/path/to/works/MY-UPPERCASE-PROJECT.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Uppercase Project',
        date: '2023-05-20',
      },
      content: 'Project with uppercase filename',
    })

    mockGetFilename.mockReturnValue('MY-UPPERCASE-PROJECT')
    mockFormatDate.mockReturnValue('May 20, 2023')

    const result = getWork(mockFilepath)

    expect(result.metadatum.uri).toBe('/works/MY-UPPERCASE-PROJECT')
  })
})
