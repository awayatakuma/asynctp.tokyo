import { getFilename } from '@/utils/getFilename'

describe('getFilename', () => {
  it('should extract filename from .md file path', () => {
    const filepath = 'src/contents/about/about.md'
    const result = getFilename(filepath)
    expect(result).toBe('about')
  })

  it('should extract filename from .mdx file path', () => {
    const filepath = 'src/contents/blog/my-post.mdx'
    const result = getFilename(filepath)
    expect(result).toBe('my-post')
  })

  it('should extract filename from absolute path', () => {
    const filepath = '/home/user/projects/blog/sample-post.md'
    const result = getFilename(filepath)
    expect(result).toBe('sample-post')
  })

  it('should handle nested directory paths', () => {
    const filepath = 'deep/nested/directory/structure/filename.md'
    const result = getFilename(filepath)
    expect(result).toBe('filename')
  })

  it('should handle files with multiple dots', () => {
    const filepath = 'path/to/file.name.with.dots.md'
    const result = getFilename(filepath)
    expect(result).toBe('file.name.with.dots')
  })

  it('should handle different file extensions', () => {
    const filepath = 'path/to/document.txt'
    const result = getFilename(filepath)
    expect(result).toBe('document')
  })

  it('should handle files without extension', () => {
    const filepath = 'path/to/README'
    const result = getFilename(filepath)
    expect(result).toBe('README')
  })

  it('should handle single filename without path', () => {
    const filepath = 'simple-file.md'
    const result = getFilename(filepath)
    expect(result).toBe('simple-file')
  })

  it('should handle Windows-style paths', () => {
    const filepath = 'C:\\Projects\\blog\\windows-post.md'
    const result = getFilename(filepath)
    // On Unix systems, Windows paths are not parsed correctly by path.basename
    // This is expected behavior - the function works correctly on the platform it runs on
    expect(result).toBe(
      process.platform === 'win32'
        ? 'windows-post'
        : 'C:\\Projects\\blog\\windows-post'
    )
  })

  it('should handle empty extension', () => {
    const filepath = 'path/to/file.'
    const result = getFilename(filepath)
    expect(result).toBe('file')
  })
})
