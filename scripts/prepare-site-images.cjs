// Create local, cacheable WebP derivatives from tracked original artwork.
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

const publicDir = path.resolve(__dirname, '../public')
const outputDir = path.join(publicDir, 'optimized')
const images = [
  ['svetlana-portrait.png', 'svetlana-portrait.webp', 1120, 87],
  ['certificates-cover.png', 'certificates-cover.webp', 900, 86],
  ['liderm-clinic-reception.jpg', 'liderm-clinic-reception.webp', 1120, 86],
  ['backgrounds/sveta-center-desktop.png', 'sveta-center-desktop.webp', 1920, 83],
  ['backgrounds/sveta-center-mobile.png', 'sveta-center-mobile.webp', 1080, 83],
]

async function main() {
  await fs.mkdir(outputDir, { recursive: true })
  // Sequential encoding keeps peak build memory bounded.
  for (const [source, target, width, quality] of images) {
    const input = path.join(publicDir, source)
    const output = path.join(outputDir, target)
    const before = (await fs.stat(input)).size
    const info = await sharp(input, { failOn: 'error' })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(output)
    if (!info.width || !info.height || !info.size) throw new Error('Invalid output: ' + target)
    console.log('[site-image] ' + target + ': ' + before + ' -> ' + info.size + ' bytes')
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
