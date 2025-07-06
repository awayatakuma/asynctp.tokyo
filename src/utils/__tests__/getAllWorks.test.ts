import fs from 'node:fs'
import path from 'node:path'
import { getAllWorks } from '@/utils/getAllWorks'
import { getWork } from '@/utils/getWork'

jest.mock('node:fs')
jest.mock('node:path')
jest.mock('@/utils/getWork')
jest.mock('@/constants', () => ({
  WORKS_CONTENTS_DIR_PATH: '/mock/works/contents',
}))

const mockFs = fs as jest.Mocked<typeof fs>
const mockPath = path as jest.Mocked<typeof path>
const mockGetWork = getWork as jest.MockedFunction<typeof getWork>

describe('getAllWorks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPath.join.mockImplementation((...args) => args.join('/'))
  })

  it('should return all works from md and mdx files', () => {
    const mockFiles = ['work1.md', 'work2.mdx', 'readme.txt', 'work3.MD']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const mockWork1 = {
      metadatum: {
        uri: '/works/work1',
        title: 'First Work',
        date: 'January 1, 2023',
      },
      content: 'Content of first work',
    }

    const mockWork2 = {
      metadatum: {
        uri: '/works/work2',
        title: 'Second Work',
        date: 'January 2, 2023',
      },
      content: 'Content of second work',
    }

    const mockWork3 = {
      metadatum: {
        uri: '/works/work3',
        title: 'Third Work',
        date: 'January 3, 2023',
      },
      content: 'Content of third work',
    }

    mockGetWork
      .mockReturnValueOnce(mockWork1)
      .mockReturnValueOnce(mockWork2)
      .mockReturnValueOnce(mockWork3)

    const result = getAllWorks()

    expect(mockFs.readdirSync).toHaveBeenCalledWith('/mock/works/contents')
    expect(mockGetWork).toHaveBeenCalledTimes(3)
    expect(mockGetWork).toHaveBeenCalledWith('/mock/works/contents/work1.md')
    expect(mockGetWork).toHaveBeenCalledWith('/mock/works/contents/work2.mdx')
    expect(mockGetWork).toHaveBeenCalledWith('/mock/works/contents/work3.MD')

    expect(result).toEqual([mockWork1, mockWork2, mockWork3])
  })

  it('should filter out non-markdown files', () => {
    const mockFiles = [
      'work1.md',
      'config.json',
      'work2.mdx',
      'image.png',
      'script.js',
    ]

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const mockWork1 = {
      metadatum: {
        uri: '/works/work1',
        title: 'Work 1',
        date: 'January 1, 2023',
      },
      content: 'Work 1 content',
    }

    const mockWork2 = {
      metadatum: {
        uri: '/works/work2',
        title: 'Work 2',
        date: 'January 2, 2023',
      },
      content: 'Work 2 content',
    }

    mockGetWork.mockReturnValueOnce(mockWork1).mockReturnValueOnce(mockWork2)

    const result = getAllWorks()

    expect(mockGetWork).toHaveBeenCalledTimes(2)
    expect(mockGetWork).toHaveBeenCalledWith('/mock/works/contents/work1.md')
    expect(mockGetWork).toHaveBeenCalledWith('/mock/works/contents/work2.mdx')
    expect(result).toEqual([mockWork1, mockWork2])
  })

  it('should return empty array when no markdown files exist', () => {
    const mockFiles = ['config.json', 'image.png', 'style.css']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const result = getAllWorks()

    expect(result).toEqual([])
    expect(mockGetWork).not.toHaveBeenCalled()
  })

  it('should return empty array when directory is empty', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue([] as any)

    const result = getAllWorks()

    expect(result).toEqual([])
    expect(mockGetWork).not.toHaveBeenCalled()
  })

  it('should handle case-insensitive file extensions', () => {
    const mockFiles = [
      'work1.md',
      'work2.MD',
      'work3.Md',
      'work4.mdx',
      'work5.MDX',
    ]

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    const createMockWork = (filename: string) => ({
      metadatum: {
        uri: `/works/${filename.split('.')[0]}`,
        title: `Work from ${filename}`,
        date: 'January 1, 2023',
      },
      content: `Content from ${filename}`,
    })

    mockGetWork
      .mockReturnValueOnce(createMockWork('work1.md'))
      .mockReturnValueOnce(createMockWork('work2.MD'))
      .mockReturnValueOnce(createMockWork('work3.Md'))
      .mockReturnValueOnce(createMockWork('work4.mdx'))
      .mockReturnValueOnce(createMockWork('work5.MDX'))

    const result = getAllWorks()

    expect(mockGetWork).toHaveBeenCalledTimes(5)
    expect(result).toHaveLength(5)
  })

  it('should preserve order of files as returned by readdir', () => {
    const mockFiles = ['z-work.md', 'a-work.md', 'm-work.md']

    // biome-ignore lint/suspicious/noExplicitAny: Test mock setup
    mockFs.readdirSync.mockReturnValue(mockFiles as any)

    mockGetWork
      .mockReturnValueOnce({
        metadatum: {
          uri: '/works/z-work',
          title: 'Z Work',
          date: '2023-01-01',
        },
        content: 'Z content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/works/a-work',
          title: 'A Work',
          date: '2023-01-01',
        },
        content: 'A content',
      })
      .mockReturnValueOnce({
        metadatum: {
          uri: '/works/m-work',
          title: 'M Work',
          date: '2023-01-01',
        },
        content: 'M content',
      })

    const result = getAllWorks()

    expect(result[0].metadatum.title).toBe('Z Work')
    expect(result[1].metadatum.title).toBe('A Work')
    expect(result[2].metadatum.title).toBe('M Work')
  })
})
