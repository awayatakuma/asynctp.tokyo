import fs from 'node:fs'
import matter from 'gray-matter'
import { getMarkdownContent } from '@/utils/getMarkdownContent'

jest.mock('node:fs')
jest.mock('gray-matter')

const mockFs = fs as jest.Mocked<typeof fs>
const mockMatter = matter as jest.MockedFunction<typeof matter>

describe('getMarkdownContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should read file and parse frontmatter correctly', () => {
    const mockFileContent = `---
title: Test Post
date: 2023-01-01
tags: [test, blog]
---

# Test Content

This is test markdown content.`

    const mockParsedResult = {
      data: {
        title: 'Test Post',
        date: '2023-01-01',
        tags: ['test', 'blog'],
      },
      content: '# Test Content\n\nThis is test markdown content.',
      orig: mockFileContent,
      language: '',
      matter: '',
      stringify: jest.fn(),
    }

    mockFs.readFileSync.mockReturnValue(mockFileContent)
    mockMatter.mockReturnValue(mockParsedResult)

    const result = getMarkdownContent('/path/to/test.md')

    expect(mockFs.readFileSync).toHaveBeenCalledWith('/path/to/test.md', 'utf8')
    expect(mockMatter).toHaveBeenCalledWith(mockFileContent)
    expect(result).toEqual({
      data: {
        title: 'Test Post',
        date: '2023-01-01',
        tags: ['test', 'blog'],
      },
      content: '# Test Content\n\nThis is test markdown content.',
    })
  })

  it('should handle files without frontmatter', () => {
    const mockFileContent = `# Simple Content

Just markdown without frontmatter.`

    const mockParsedResult = {
      data: {},
      content: '# Simple Content\n\nJust markdown without frontmatter.',
      orig: mockFileContent,
      language: '',
      matter: '',
      stringify: jest.fn(),
    }

    mockFs.readFileSync.mockReturnValue(mockFileContent)
    mockMatter.mockReturnValue(mockParsedResult)

    const result = getMarkdownContent('/path/to/simple.md')

    expect(result).toEqual({
      data: {},
      content: '# Simple Content\n\nJust markdown without frontmatter.',
    })
  })

  it('should handle empty files', () => {
    const mockFileContent = ''
    const mockParsedResult = {
      data: {},
      content: '',
      orig: mockFileContent,
      language: '',
      matter: '',
      stringify: jest.fn(),
    }

    mockFs.readFileSync.mockReturnValue(mockFileContent)
    mockMatter.mockReturnValue(mockParsedResult)

    const result = getMarkdownContent('/path/to/empty.md')

    expect(result).toEqual({
      data: {},
      content: '',
    })
  })

  it('should handle complex frontmatter data', () => {
    const mockFileContent = `---
title: Complex Post
date: 2023-12-25
author:
  name: John Doe
  email: john@example.com
tags: [javascript, react, nextjs]
featured: true
metadata:
  seo:
    description: Complex SEO description
---

# Complex Content`

    const mockParsedResult = {
      data: {
        title: 'Complex Post',
        date: '2023-12-25',
        author: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        tags: ['javascript', 'react', 'nextjs'],
        featured: true,
        metadata: {
          seo: {
            description: 'Complex SEO description',
          },
        },
      },
      content: '# Complex Content',
      orig: mockFileContent,
      language: '',
      matter: '',
      stringify: jest.fn(),
    }

    mockFs.readFileSync.mockReturnValue(mockFileContent)
    mockMatter.mockReturnValue(mockParsedResult)

    const result = getMarkdownContent('/path/to/complex.md')

    expect(result.data).toEqual(mockParsedResult.data)
    expect(result.content).toBe('# Complex Content')
  })

  it('should read file with correct encoding', () => {
    const mockFileContent = 'Test content'
    const mockParsedResult = {
      data: {},
      content: 'Test content',
      orig: mockFileContent,
      language: '',
      matter: '',
      stringify: jest.fn(),
    }

    mockFs.readFileSync.mockReturnValue(mockFileContent)
    mockMatter.mockReturnValue(mockParsedResult)

    getMarkdownContent('/path/to/test.md')

    expect(mockFs.readFileSync).toHaveBeenCalledWith('/path/to/test.md', 'utf8')
  })
})
