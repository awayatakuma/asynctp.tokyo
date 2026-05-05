import fs from 'fs'
import path from 'path'
import { load } from 'cheerio'

// LinkMetadataCache を直接実装
const CACHE_FILE = path.join(process.cwd(), 'link-metadata-cache.json')

class LinkMetadataCache {
  constructor() {
    this.cache = {}
    this.loadCache()
  }

  loadCache() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const data = fs.readFileSync(CACHE_FILE, 'utf-8')
        this.cache = JSON.parse(data)
      }
    } catch (error) {
      console.error('Failed to load link metadata cache:', error)
      this.cache = {}
    }
  }

  saveCache() {
    try {
      fs.writeFileSync(CACHE_FILE, JSON.stringify(this.cache, null, 2))
    } catch (error) {
      console.error('Failed to save link metadata cache:', error)
    }
  }

  async fetchMetadata(url) {
    // キャッシュから取得（7日間以内）
    const cached = this.cache[url]
    if (cached) {
      const fetchedAt = new Date(cached.fetchedAt)
      const now = new Date()
      const hoursDiff = (now.getTime() - fetchedAt.getTime()) / (1000 * 60 * 60)
      
      if (hoursDiff < 168) { // 7日間 = 24 * 7 = 168時間
        console.log(`Using cached metadata for: ${url}`)
        return cached
      }
    }

    try {
      console.log(`Fetching metadata for: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 30000, // 30秒タイムアウト
      })

      if (!response.ok) {
        console.warn(`⚠️ HTTP ${response.status} for ${url}. Keeping existing metadata if available.`)
        return this.cache[url] || null
      }

      const html = await response.text()
      const $ = load(html)

      // メタデータを抽出
      const title = 
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        'No Title'

      const description = 
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="twitter:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        'No Description'

      const image = 
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        $('meta[name="twitter:image:src"]').attr('content') ||
        ''

      const siteName = 
        $('meta[property="og:site_name"]').attr('content') ||
        $('meta[name="twitter:site"]').attr('content') ||
        new URL(url).hostname

      // ファビコンを取得
      let favicon = 
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href') ||
        $('link[rel="apple-touch-icon"]').attr('href') ||
        '/favicon.ico'

      // 相対URLを絶対URLに変換
      if (favicon && !favicon.startsWith('http')) {
        const baseUrl = new URL(url)
        favicon = favicon.startsWith('/') 
          ? `${baseUrl.protocol}//${baseUrl.host}${favicon}`
          : `${baseUrl.protocol}//${baseUrl.host}/${favicon}`
      }

      // 画像URLも絶対URLに変換
      let absoluteImage = image
      if (image && !image.startsWith('http')) {
        const baseUrl = new URL(url)
        absoluteImage = image.startsWith('/') 
          ? `${baseUrl.protocol}//${baseUrl.host}${image}`
          : `${baseUrl.protocol}//${baseUrl.host}/${image}`
      }

      const metadata = {
        url,
        title: title.trim().slice(0, 100),
        description: description.trim().slice(0, 200),
        image: absoluteImage,
        siteName: siteName?.trim() || new URL(url).hostname,
        favicon,
        fetchedAt: new Date().toISOString(),
      }

      // キャッシュに保存
      this.cache[url] = metadata
      this.saveCache()

      return metadata
    } catch (error) {
      console.warn(`⚠️ Failed to fetch metadata for ${url}:`, error.message)
      return this.cache[url] || null
    }
  }
}

const linkMetadataCache = new LinkMetadataCache()

const CONTENTS_DIR = path.join(process.cwd(), 'src/contents')

// MDXファイルからURLを抽出する関数
function extractUrlsFromMdx(content) {
  const urls = []
  
  // マークダウンリンクのURLを抽出: [text](url)
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g
  let match
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1]
    let url = match[2]
    
    // URLをクリーンアップ（末尾の不要文字を削除）
    url = url.replace(/[\]\)]*$/, '')
    
    // URLがリンクテキストと同じ場合（自動検出対象）
    if (linkText === url && (url.startsWith('http://') || url.startsWith('https://'))) {
      // 有効なURLかチェック
      try {
        new URL(url)
        urls.push(url)
      } catch (e) {
        console.warn(`Invalid URL skipped: ${url}`)
      }
    }
  }
  
  // 直接記述されたURLを抽出
  const directUrlRegex = /(?:^|\s)(https?:\/\/[^\s\]\)]+)/gm
  while ((match = directUrlRegex.exec(content)) !== null) {
    let url = match[1]
    
    // URLをクリーンアップ
    url = url.replace(/[\]\)\.]*$/, '')
    
    // 有効なURLかチェック
    try {
      new URL(url)
      if (!urls.includes(url)) {
        urls.push(url)
      }
    } catch (e) {
      console.warn(`Invalid URL skipped: ${url}`)
    }
  }
  
  return urls
}

// メイン処理
// MDXファイルを再帰的に検索する関数
function findMdxFiles(dir) {
  const mdxFiles = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      mdxFiles.push(...findMdxFiles(fullPath))
    } else if (item.isFile() && item.name.endsWith('.mdx')) {
      mdxFiles.push(fullPath)
    }
  }
  
  return mdxFiles
}

async function prebuildLinks() {
  console.log('🔗 Pre-building link metadata...')
  
  try {
    // 全てのMDXファイルを再帰的に検索
    const mdxFiles = findMdxFiles(CONTENTS_DIR)
    const allUrls = new Set()
    
    for (const filePath of mdxFiles) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const urls = extractUrlsFromMdx(content)
      
      urls.forEach(url => allUrls.add(url))
      
      if (urls.length > 0) {
        const relativePath = path.relative(CONTENTS_DIR, filePath)
        console.log(`📄 ${relativePath}: Found ${urls.length} URLs`)
        urls.forEach(url => console.log(`  - ${url}`))
      }
    }
    
    // 各URLのメタデータを取得
    console.log(`\n🌐 Fetching metadata for ${allUrls.size} unique URLs...`)
    
    const promises = Array.from(allUrls).map(async (url) => {
      try {
        await linkMetadataCache.fetchMetadata(url)
      } catch (error) {
        console.error(`❌ Failed to fetch ${url}:`, error.message)
      }
    })
    
    await Promise.all(promises)
    
    // TypeScriptファイルとして静的メタデータを生成
    const staticDataPath = path.join(process.cwd(), 'lib/data/linkMetadata.ts')
    const staticDataDir = path.dirname(staticDataPath)
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(staticDataDir)) {
      fs.mkdirSync(staticDataDir, { recursive: true })
    }
    
    const staticContent = `// Auto-generated by prebuild-links.mjs - DO NOT EDIT MANUALLY
import type { LinkMetadata } from '@/types'

export const staticLinkMetadata: Record<string, LinkMetadata> = ${JSON.stringify(linkMetadataCache.cache, null, 2)}
`
    
    fs.writeFileSync(staticDataPath, staticContent)
    console.log(`📁 Generated static metadata: ${staticDataPath}`)
    
    console.log('✅ Link metadata pre-build completed!')
    
  } catch (error) {
    console.error('❌ Pre-build failed:', error)
    process.exit(1)
  }
}

// 実行
prebuildLinks()