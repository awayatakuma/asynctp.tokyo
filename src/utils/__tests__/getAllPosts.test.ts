import fs from 'node:fs'
import path from 'node:path'
import { getAllPosts } from '@/utils/getAllPosts'
import { getPost } from '@/utils/getPost'

jest.mock('node:fs')
jest.mock('node:path')
jest.mock('../getPost')
jest.mock('@/constants', () => ({
  BLOG_CONTENTS_DIR_PATH: '/mock/blog/contents',
}))

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>
const mockGetPost = getPost as jest.MockedFunction<typeof getPost>

describe('getAllPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPath.join.mockImplementation((...args) => args.join('/'))
  })

  it('should return metadata for all posts in the directory', () => {
    const mockFiles = ['post1.md', 'post2.md', 'post3.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const mockPost1 = {
      metadatum: {
        uri: '/blog/post1',
        title: 'First Post',
        date: 'January 1, 2023',
        description: 'Description of first post',
        emoji: '🚀',
        tags: ['javascript', 'react'],
      },
      content: 'Content of first post',
    }

    const mockPost2 = {
      metadatum: {
        uri: '/blog/post2',
        title: 'Second Post',
        date: 'January 2, 2023',
        description: 'Description of second post',
        emoji: '📝',
        tags: ['typescript', 'nextjs'],
      },
      content: 'Content of second post',
    }

    const mockPost3 = {
      metadatum: {
        uri: '/blog/post3',
        title: 'Third Post',
        date: 'January 3, 2023',
        description: 'Description of third post',
        emoji: '🎯',
        tags: ['testing', 'jest'],
      },
      content: 'Content of third post',
    }

    mockGetPost
      .mockReturnValueOnce(mockPost1)
      .mockReturnValueOnce(mockPost2)
      .mockReturnValueOnce(mockPost3)

    const result = getAllPosts()

    expect(mockFs.readdirSync).toHaveBeenCalledWith('/mock/blog/contents')
    expect(mockGetPost).toHaveBeenCalledTimes(3)
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post1.md')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post2.md')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post3.md')

    expect(result).toEqual([
      mockPost1.metadatum,
      mockPost2.metadatum,
      mockPost3.metadatum,
    ])
  })

  it('should return empty array when no files exist', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue([] as any)

    const result = getAllPosts()

    expect(result).toEqual([])
    expect(mockGetPost).not.toHaveBeenCalled()
  })

  it('should handle single post file', () => {
    const mockFiles = ['single-post.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const mockPost = {
      metadatum: {
        uri: '/blog/single-post',
        title: 'Single Post',
        date: 'December 25, 2023',
        description: 'A single blog post',
        emoji: '📖',
        tags: ['solo'],
      },
      content: 'Content of single post',
    }

    mockGetPost.mockReturnValueOnce(mockPost)

    const result = getAllPosts()

    expect(result).toEqual([mockPost.metadatum])
    expect(mockGetPost).toHaveBeenCalledTimes(1)
    expect(mockGetPost).toHaveBeenCalledWith(
      '/mock/blog/contents/single-post.md'
    )
  })

  it('should process all file types in directory', () => {
    const mockFiles = ['post1.md', 'post2.mdx', 'post3.txt']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const createMockPost = (filename: string) => ({
      metadatum: {
        uri: `/blog/${filename.split('.')[0]}`,
        title: `Post from ${filename}`,
        date: 'January 1, 2023',
        description: `Description for ${filename}`,
        emoji: '📄',
        tags: ['test'],
      },
      content: `Content from ${filename}`,
    })

    mockGetPost
      .mockReturnValueOnce(createMockPost('post1.md'))
      .mockReturnValueOnce(createMockPost('post2.mdx'))
      .mockReturnValueOnce(createMockPost('post3.txt'))

    const result = getAllPosts()

    expect(result).toHaveLength(3)
    expect(mockGetPost).toHaveBeenCalledTimes(3)
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post1.md')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post2.mdx')
    expect(mockGetPost).toHaveBeenCalledWith('/mock/blog/contents/post3.txt')
  })

  it('should preserve order of files as returned by readdir', () => {
    const mockFiles = ['z-post.md', 'a-post.md', 'm-post.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetPost
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/z-post',
          title: 'Z Post',
          date: '2023-01-01',
          description: 'Z',
          emoji: '🔤',
          tags: [],
        },
        content: 'Z content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/a-post',
          title: 'A Post',
          date: '2023-01-01',
          description: 'A',
          emoji: '🔤',
          tags: [],
        },
        content: 'A content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/blog/m-post',
          title: 'M Post',
          date: '2023-01-01',
          description: 'M',
          emoji: '🔤',
          tags: [],
        },
        content: 'M content',
      })

    const result = getAllPosts()

    expect(result[0].title).toBe('Z Post')
    expect(result[1].title).toBe('A Post')
    expect(result[2].title).toBe('M Post')
  })
})
