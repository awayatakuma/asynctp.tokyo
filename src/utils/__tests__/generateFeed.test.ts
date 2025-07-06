import { generateFeed } from '@/utils/generateFeed'
import { getAllPosts } from '@/utils/getAllPosts'

jest.mock('../getAllPosts')
const mockFeedInstance = {
  addItem: jest.fn(),
  rss2: jest.fn(),
}

jest.mock('feed', () => ({
  Feed: jest.fn().mockImplementation(() => mockFeedInstance),
}))
jest.mock('@/constants', () => ({
  AUTHOR: 'Test Author',
  DESCRIPTION: 'Test Description',
  HERO_ICON: '/assets/test-icon.png',
  MAIL: 'test@example.com',
  SITE_NAME: 'Test Site',
  SITE_ORIGIN: 'https://test.example.com',
}))

const mockGetAllPosts = getAllPosts as jest.MockedFunction<typeof getAllPosts>

describe('generateFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    mockFeedInstance.rss2.mockReturnValue(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Test Site</title>
<description>Test Description</description>
<link>https://test.example.com</link>
<managingEditor>test@example.com (Test Author)</managingEditor>
</channel>
</rss>`)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should generate RSS feed with posts', async () => {
    const mockPosts = [
      {
        uri: '/blog/test-post-1',
        title: 'Test Post 1',
        description: 'Description for test post 1',
        date: 'January 1, 2023',
        emoji: '🚀',
        tags: ['tech', 'test'],
      },
      {
        uri: '/blog/test-post-2',
        title: 'Test Post 2',
        description: 'Description for test post 2',
        date: 'February 1, 2023',
        emoji: '📝',
        tags: ['blog'],
      },
    ]

    mockGetAllPosts.mockReturnValue(mockPosts)

    const result = await generateFeed()

    expect(mockFeedInstance.addItem).toHaveBeenCalledTimes(2)
    expect(mockFeedInstance.addItem).toHaveBeenCalledWith({
      title: 'Test Post 1',
      description: 'Description for test post 1',
      id: 'https://test.example.com/blog/test-post-1',
      link: 'https://test.example.com/blog/test-post-1',
      guid: 'https://test.example.com/blog/test-post-1',
      date: expect.any(Date),
      category: [{ name: 'tech' }, { name: 'test' }],
    })
    expect(mockFeedInstance.rss2).toHaveBeenCalled()
    expect(typeof result).toBe('string')
  })

  it('should handle empty posts array', async () => {
    mockGetAllPosts.mockReturnValue([])

    const result = await generateFeed()

    expect(mockFeedInstance.addItem).not.toHaveBeenCalled()
    expect(mockFeedInstance.rss2).toHaveBeenCalled()
    expect(typeof result).toBe('string')
  })

  it('should include categories for posts with tags', async () => {
    const mockPosts = [
      {
        uri: '/blog/tagged-post',
        title: 'Tagged Post',
        description: 'A post with tags',
        date: 'March 1, 2023',
        emoji: '🏷️',
        tags: ['javascript', 'react', 'testing'],
      },
    ]

    mockGetAllPosts.mockReturnValue(mockPosts)

    await generateFeed()

    expect(mockFeedInstance.addItem).toHaveBeenCalledWith({
      title: 'Tagged Post',
      description: 'A post with tags',
      id: 'https://test.example.com/blog/tagged-post',
      link: 'https://test.example.com/blog/tagged-post',
      guid: 'https://test.example.com/blog/tagged-post',
      date: expect.any(Date),
      category: [
        { name: 'javascript' },
        { name: 'react' },
        { name: 'testing' },
      ],
    })
  })

  it('should format dates correctly in feed items', async () => {
    const mockPosts = [
      {
        uri: '/blog/date-test',
        title: 'Date Test Post',
        description: 'Testing date formatting',
        date: 'December 25, 2023',
        emoji: '📅',
        tags: [],
      },
    ]

    mockGetAllPosts.mockReturnValue(mockPosts)

    await generateFeed()

    expect(mockFeedInstance.addItem).toHaveBeenCalledWith({
      title: 'Date Test Post',
      description: 'Testing date formatting',
      id: 'https://test.example.com/blog/date-test',
      link: 'https://test.example.com/blog/date-test',
      guid: 'https://test.example.com/blog/date-test',
      date: expect.any(Date),
      category: [],
    })
  })

  it('should call getAllPosts to retrieve post metadata', async () => {
    mockGetAllPosts.mockReturnValue([])

    await generateFeed()

    expect(mockGetAllPosts).toHaveBeenCalledTimes(1)
  })
})
