import fs from 'node:fs'
import path from 'node:path'
import { getPost } from '@/utils/getPost'
import { getPostMetadataFromTag } from '@/utils/getPostMetadataFromTag'

jest.mock('node:fs')
jest.mock('node:path')
jest.mock('@/utils/getPost')
jest.mock('@/constants', () => ({
  BLOG_CONTENTS_DIR_PATH: '/mock/blog/contents',
}))

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>
const mockGetPost = getPost as jest.MockedFunction<typeof getPost>

describe('getPostMetadataFromTag', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPath.join.mockImplementation((...args) => args.join('/'))
  })

  it('should return posts that contain the specified tag', () => {
    const mockFiles = ['post1.md', 'post2.md', 'post3.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'React Post',
          date: 'January 1, 2023',
          description: 'About React',
          emoji: '⚛️',
          tags: ['javascript', 'react', 'frontend'],
        },
        content: 'React content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'Node.js Post',
          date: 'January 2, 2023',
          description: 'About Node.js',
          emoji: '🟢',
          tags: ['javascript', 'nodejs', 'backend'],
        },
        content: 'Node.js content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post3',
          title: 'Python Post',
          date: 'January 3, 2023',
          description: 'About Python',
          emoji: '🐍',
          tags: ['python', 'backend'],
        },
        content: 'Python content',
      })

    const result = getPostMetadataFromTag('javascript')

    expect(mockFs.readdirSync).toHaveBeenCalledWith('/mock/blog/contents')
    expect(mockGetPost).toHaveBeenCalledTimes(3)

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('React Post')
    expect(result[1].title).toBe('Node.js Post')
    expect(result.every((post) => post.tags.includes('javascript'))).toBe(true)
  })

  it('should return empty array when no posts have the specified tag', () => {
    const mockFiles = ['post1.md', 'post2.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'React Post',
          date: 'January 1, 2023',
          description: 'About React',
          emoji: '⚛️',
          tags: ['javascript', 'react'],
        },
        content: 'React content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'CSS Post',
          date: 'January 2, 2023',
          description: 'About CSS',
          emoji: '🎨',
          tags: ['css', 'styling'],
        },
        content: 'CSS content',
      })

    const result = getPostMetadataFromTag('python')

    expect(result).toEqual([])
  })

  it('should return empty array when no files exist', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue([] as any)

    const result = getPostMetadataFromTag('any-tag')

    expect(result).toEqual([])
    expect(mockGetPost).not.toHaveBeenCalled()
  })

  it('should handle posts with empty tags array', () => {
    const mockFiles = ['post1.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost.mockReturnValueOnce({
      metadatum: {
        uri: '/blog/post1',
        title: 'Untagged Post',
        date: 'January 1, 2023',
        description: 'Post without tags',
        emoji: '📝',
        tags: [],
      },
      content: 'Untagged content',
    })

    const result = getPostMetadataFromTag('any-tag')

    expect(result).toEqual([])
  })

  it('should be case-sensitive for tag matching', () => {
    const mockFiles = ['post1.md', 'post2.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    // Mock for first call (JavaScript search)
    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'JavaScript Post',
          date: 'January 1, 2023',
          description: 'About JavaScript',
          emoji: '🟨',
          tags: ['JavaScript', 'frontend'],
        },
        content: 'JavaScript content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'javascript Post',
          date: 'January 2, 2023',
          description: 'About javascript',
          emoji: '🟡',
          tags: ['javascript', 'backend'],
        },
        content: 'javascript content',
      })
      // Mock for second call (javascript search)
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'JavaScript Post',
          date: 'January 1, 2023',
          description: 'About JavaScript',
          emoji: '🟨',
          tags: ['JavaScript', 'frontend'],
        },
        content: 'JavaScript content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'javascript Post',
          date: 'January 2, 2023',
          description: 'About javascript',
          emoji: '🟡',
          tags: ['javascript', 'backend'],
        },
        content: 'javascript content',
      })

    const upperResult = getPostMetadataFromTag('JavaScript')
    const lowerResult = getPostMetadataFromTag('javascript')

    expect(upperResult).toHaveLength(1)
    expect(upperResult[0].title).toBe('JavaScript Post')

    expect(lowerResult).toHaveLength(1)
    expect(lowerResult[0].title).toBe('javascript Post')
  })

  it('should return all matching posts regardless of order', () => {
    const mockFiles = ['a.md', 'b.md', 'c.md', 'd.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/a',
          title: 'Post A',
          date: 'January 1, 2023',
          description: 'First post',
          emoji: '🅰️',
          tags: ['common', 'a-specific'],
        },
        content: 'A content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/b',
          title: 'Post B',
          date: 'January 2, 2023',
          description: 'Second post',
          emoji: '🅱️',
          tags: ['different'],
        },
        content: 'B content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/c',
          title: 'Post C',
          date: 'January 3, 2023',
          description: 'Third post',
          emoji: '🌊',
          tags: ['common', 'c-specific'],
        },
        content: 'C content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/d',
          title: 'Post D',
          date: 'January 4, 2023',
          description: 'Fourth post',
          emoji: '🎯',
          tags: ['other'],
        },
        content: 'D content',
      })

    const result = getPostMetadataFromTag('common')

    expect(result).toHaveLength(2)
    expect(result.map((post) => post.title)).toEqual(['Post A', 'Post C'])
  })
})
