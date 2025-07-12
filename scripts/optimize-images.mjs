#!/usr/bin/env node

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const CONTENTS_DIR = path.join(process.cwd(), 'public/contents')
const ASSETS_DIR = path.join(process.cwd(), 'public/assets')

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...')

  // PNG画像をWebPに変換
  const pngFiles = [
    path.join(ASSETS_DIR, 'asynct_logo.png'),
    path.join(ASSETS_DIR, 'pixel_icon.png'),
    path.join(ASSETS_DIR, 'top.png'),
    ...fs.readdirSync(CONTENTS_DIR)
      .filter(file => file.endsWith('.png'))
      .map(file => path.join(CONTENTS_DIR, file))
  ]

  for (const pngFile of pngFiles) {
    if (fs.existsSync(pngFile)) {
      const webpFile = pngFile.replace('.png', '.webp')
      
      try {
        await sharp(pngFile)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpFile)
        
        const originalSize = fs.statSync(pngFile).size
        const optimizedSize = fs.statSync(webpFile).size
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)
        
        console.log(`✅ ${path.basename(pngFile)} → ${path.basename(webpFile)} (${savings}% saved)`)
      } catch (error) {
        console.error(`❌ Failed to optimize ${pngFile}:`, error.message)
      }
    }
  }

  console.log('🎉 Image optimization completed!')
  console.log('\n📝 Next steps for GIF optimization:')
  console.log('1. Use online tools like ezgif.com to compress large GIFs')
  console.log('2. Consider converting to MP4 for better compression')
  console.log('3. Implement lazy loading for large media files')
}

optimizeImages().catch(console.error)