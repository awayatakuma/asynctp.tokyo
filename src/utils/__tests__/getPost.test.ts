import { formatDate } from '@/utils/formatDate'
import { getFilename } from '@/utils/getFilename'
import { getMarkdownContent } from '@/utils/getMarkdownContent'
import { getPost } from '@/utils/getPost'

jest.mock('@/utils/formatDate')
jest.mock('@/utils/getFilename')
jest.mock('@/utils/getMarkdownContent')
jest.mock('@/constants', () => ({
  BLOG_PATH: '/blog/',
}))

const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>
const mockGetFilename = getFilename as jest.MockedFunction<typeof getFilename>
const mockGetMarkdownContent = getMarkdownContent as jest.MockedFunction<
  typeof getMarkdownContent
>

describe('getPost', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process post file and return Post object', () => {
    const mockFilepath = '/path/to/blog/my-post.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'My Blog Post',
        date: '2023-12-25',
        description: 'A great blog post',
        emoji: '🚀',
        tags: ['javascript', 'react'],
      },
      content: '# My Blog Post\n\nThis is the content of my blog post.',
    })

    mockGetFilename.mockReturnValue('my-post')
    mockFormatDate.mockReturnValue('December 25, 2023')

    const result = getPost(mockFilepath)

    expect(mockGetMarkdownContent).toHaveBeenCalledWith(mockFilepath)
    expect(mockGetFilename).toHaveBeenCalledWith(mockFilepath)
    expect(mockFormatDate).toHaveBeenCalledWith('2023-12-25')

    expect(result).toEqual({
      metadatum: {
        uri: '/blog/my-post',
        title: 'My Blog Post',
        date: 'December 25, 2023',
        description: 'A great blog post',
        emoji: '🚀',
        tags: ['javascript', 'react'],
      },
      content: '# My Blog Post\n\nThis is the content of my blog post.',
    })
  })

  it('should handle posts with minimal frontmatter', () => {
    const mockFilepath = '/path/to/blog/simple-post.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Simple Post',
        date: '2023-01-01',
        description: 'Simple description',
        emoji: '📝',
        tags: [],
      },
      content: 'Simple content',
    })

    mockGetFilename.mockReturnValue('simple-post')
    mockFormatDate.mockReturnValue('January 1, 2023')

    const result = getPost(mockFilepath)

    expect(result.metadatum.tags).toEqual([])
    expect(result.metadatum.title).toBe('Simple Post')
    expect(result.content).toBe('Simple content')
  })

  it('should handle posts with complex tags array', () => {
    const mockFilepath = '/path/to/blog/tagged-post.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Tagged Post',
        date: '2023-06-15',
        description: 'Post with many tags',
        emoji: '🏷️',
        tags: ['javascript', 'typescript', 'react', 'nextjs', 'testing'],
      },
      content: 'Tagged content',
    })

    mockGetFilename.mockReturnValue('tagged-post')
    mockFormatDate.mockReturnValue('June 15, 2023')

    const result = getPost(mockFilepath)

    expect(result.metadatum.tags).toEqual([
      'javascript',
      'typescript',
      'react',
      'nextjs',
      'testing',
    ])
  })

  it('should construct correct URI using BLOG_PATH and filename', () => {
    const mockFilepath = '/different/path/to/awesome-post.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Awesome Post',
        date: '2023-03-10',
        description: 'An awesome post',
        emoji: '⭐',
        tags: ['awesome'],
      },
      content: 'Awesome content',
    })

    mockGetFilename.mockReturnValue('awesome-post')
    mockFormatDate.mockReturnValue('March 10, 2023')

    const result = getPost(mockFilepath)

    expect(result.metadatum.uri).toBe('/blog/awesome-post')
  })

  it('should handle different date formats', () => {
    const mockFilepath = '/path/to/blog/date-test.md'

    mockGetMarkdownContent.mockReturnValue({
      data: {
        title: 'Date Test',
        date: '2023-12-31T23:59:59Z',
        description: 'Testing date formats',
        emoji: '📅',
        tags: ['date'],
      },
      content: 'Date content',
    })

    mockGetFilename.mockReturnValue('date-test')
    mockFormatDate.mockReturnValue('December 31, 2023')

    const result = getPost(mockFilepath)

    expect(mockFormatDate).toHaveBeenCalledWith('2023-12-31T23:59:59Z')
    expect(result.metadatum.date).toBe('December 31, 2023')
  })

  it('should pass through all frontmatter data correctly', () => {
    const mockFilepath = '/path/to/blog/full-post.md'

    const frontmatterData = {
      title: 'Complete Post',
      date: '2023-08-20',
      description: 'A complete blog post with all fields',
      emoji: '🎉',
      tags: ['complete', 'full', 'test'],
    }

    mockGetMarkdownContent.mockReturnValue({
      data: frontmatterData,
      content: 'Complete content here',
    })

    mockGetFilename.mockReturnValue('full-post')
    mockFormatDate.mockReturnValue('August 20, 2023')

    const result = getPost(mockFilepath)

    expect(result.metadatum.title).toBe(frontmatterData.title)
    expect(result.metadatum.description).toBe(frontmatterData.description)
    expect(result.metadatum.emoji).toBe(frontmatterData.emoji)
    expect(result.metadatum.tags).toBe(frontmatterData.tags)
    expect(result.content).toBe('Complete content here')
  })
})
