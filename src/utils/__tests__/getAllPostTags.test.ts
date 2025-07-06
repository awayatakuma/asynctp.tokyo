import fs from 'node:fs'
import path from 'node:path'
import { getAllPostTags } from '@/utils/getAllPostTags'
import { getPost } from '@/utils/getPost'

jest.mock('node:fs')
jest.mock('node:path')
jest.mock('@/utils/getPost')
jest.mock('@/constants', () => ({
  BLOG_CONTENTS_DIR_PATH: '/mock/blog/contents',
}))

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>
const mockGetPost = getPost as jest.MockedFunction<typeof getPost>

describe('getAllPostTags', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPath.join.mockImplementation((...args) => args.join('/'))
  })

  it('should return unique tags from all posts', () => {
    const mockFiles = ['post1.md', 'post2.md', 'post3.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'Post 1',
          date: 'January 1, 2023',
          description: 'First post',
          emoji: '🚀',
          tags: ['javascript', 'react'],
        },
        content: 'Content 1',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'Post 2',
          date: 'January 2, 2023',
          description: 'Second post',
          emoji: '📝',
          tags: ['typescript', 'react'],
        },
        content: 'Content 2',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post3',
          title: 'Post 3',
          date: 'January 3, 2023',
          description: 'Third post',
          emoji: '🎯',
          tags: ['javascript', 'nextjs'],
        },
        content: 'Content 3',
      })

    const result = getAllPostTags()

    expect(mockFs.readdirSync).toHaveBeenCalledWith('/mock/blog/contents')
    expect(mockGetPost).toHaveBeenCalledTimes(3)
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post1.md')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post2.md')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post3.md')

    expect(result).toEqual(
      expect.arrayContaining(['javascript', 'react', 'typescript', 'nextjs'])
    )
    expect(result).toHaveLength(4)
    expect(new Set(result)).toEqual(
      new Set(['javascript', 'react', 'typescript', 'nextjs'])
    )
  })

  it('should handle posts with no tags', () => {
    const mockFiles = ['post1.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost.mockReturnValueOnce({
      metadatum: {
        uri: '/blog/post1',
        title: 'Post 1',
        date: 'January 1, 2023',
        description: 'Post without tags',
        emoji: '📝',
        tags: [],
      },
      content: 'Content 1',
    })

    const result = getAllPostTags()

    expect(result).toEqual([])
  })

  it('should handle empty blog directory', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue([] as any)

    const result = getAllPostTags()

    expect(result).toEqual([])
    expect(mockGetPost).not.toHaveBeenCalled()
  })

  it('should deduplicate tags across multiple posts', () => {
    const mockFiles = ['post1.md', 'post2.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post1',
          title: 'Post 1',
          date: 'January 1, 2023',
          description: 'First post',
          emoji: '🚀',
          tags: ['javascript', 'react', 'testing'],
        },
        content: 'Content 1',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/post2',
          title: 'Post 2',
          date: 'January 2, 2023',
          description: 'Second post',
          emoji: '📝',
          tags: ['javascript', 'testing', 'nodejs'],
        },
        content: 'Content 2',
      })

    const result = getAllPostTags()

    expect(result).toEqual(
      expect.arrayContaining(['javascript', 'react', 'testing', 'nodejs'])
    )
    expect(result).toHaveLength(4)

    const uniqueTags = new Set(result)
    expect(uniqueTags.size).toBe(result.length)
  })

  it('should handle posts with duplicate tags within the same post', () => {
    const mockFiles = ['post1.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost.mockReturnValueOnce({
      metadatum: {
        uri: '/blog/post1',
        title: 'Post 1',
        date: 'January 1, 2023',
        description: 'Post with duplicate tags',
        emoji: '🔄',
        tags: ['javascript', 'javascript', 'react'],
      },
      content: 'Content 1',
    })

    const result = getAllPostTags()

    expect(result).toEqual(expect.arrayContaining(['javascript', 'react']))
    expect(result).toHaveLength(2)
  })
})
