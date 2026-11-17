/* Download and optimize product model photos at build time.
 * We ship the resulting WebP files from our own domain rather than
 * hotlinking remote catalogues on every visitor request.
 * If a vendor URL breaks, deployment fails and the previous healthy
 * version stays live. The URLs below are source references only.
 */
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

const products = [
  {
    slug: 'morpheus8',
    urls: [
      'https://www.revuclinic.lt/wp-content/uploads/2023/08/morpheus8-Revu-Clinic.png',
      'https://www.revuclinic.lt/wp-content/uploads/2023/08/morpheus8-Revu-Clinic.png?cache=1'
    ],
  },
  {
    slug: 'sylfirm-x',
    urls: [
      'https://nogerovclinic.ru/media/services/device/photo/4ce44c1ae1434deca6e16fbd5f7e5985.JPG',
      'https://bwclinic.ru/assets/cache-images/uploaded/1744808147-ab4z7f.d6c2cf9e.png',
      'https://skinclinic-yamamoto.com/images2/skin/slf0.png',
    ],
  },
  {
    slug: 'lumecca-peak-515',
    urls: [
      'https://image.clinic.beauty.hotpepper.jp/public-image/H000532405/36d7f4ad-4108-47c6-b84f-337235035dfc.jpg?h=440&impolicy=clinic01&w=780',
      'https://premamedspa.com/storage/2025/04/product-lumecca-peak-ipl.png',
      'https://image.clinic.beauty.hotpepper.jp/public-image/H000720370/53c12492-e9de-4d9e-adfb-9cd6536fb731.jpg?h=400&impolicy=clinic01&w=710',
    ],
  },
  {
    slug: 'venus-legacy',
    urls: [
      'https://img.medicalexpo.es/images_me/photo-g/86413-17149401.jpg',
      'https://img.medicalexpo.com/images_me/photo-g/86413-17149401.jpg',
      'https://img.medicalexpo.com/images_me/photo-g/86413-17126582.jpg',
    ],
  },
  {
    slug: 'ultraformer-mpt',
    urls: [
      'https://images.squarespace-cdn.com/content/v1/5fa9b7b629426f01ce5a8197/737e8441-f861-4b9b-938f-1388b5423454/cryomed-aesthetics-ultraformer-mpt-ezgif.com-webp-to-jpg-converter.webp',
      'https://naissclinic.com/img/RWD_img/ultraformerMPT/en/contentImg1.webp',
      'https://images.squarespace-cdn.com/content/v1/608cbaaec491ae1e2f4b8ab7/e45ba436-88e3-44d1-a400-a88b56c62539/cryomed-aesthetics-ultraformer-mpt-ezgif.com-webp-to-jpg-converter.jpg?format=1500w',
    ],
  },
  {
    slug: 'dermalux-tri-wave',
    urls: [
      'https://bluederme.com/cdn/shop/files/Tri-Wave-MD-7.jpg?v=1724770258',
      'https://media.praxisdienst.com/praxident-prod-public-files/media/44/c5/e0/1741688807/49698-150169-dermalux-tri-wave-md-produktbild.jpg?ts=1775337559',
      'https://bluederme.com/cdn/shop/files/Tri-Wave-MD-8.jpg?v=1724770257',
    ],
  },
]

const outDir = path.join(process.cwd(), 'public', 'devices')
const maxBytes = 8 * 1024 * 1024

async function fetchSource(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SweetPerfectImageBuilder/1.0)',
      'Accept': 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8',
    },
    signal: AbortSignal.timeout(11000),
    redirect: 'follow'
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const length = Number(res.headers.get('content-length') || 0)
  if (length > maxBytes) throw new Error('Source too large')
  const bytes = Buffer.from(await res.arrayBuffer())
  if (bytes.length < 500 || bytes.length > maxBytes) throw new Error('Invalid source size')
  const meta = await sharp(bytes).metadata()
  if ((meta.width || 0) < 250 || (meta.height || 0) < 250) throw new Error('Source dimensions too small')
  return bytes
}

async function buildImage({slug, urls}) {
  let lastErr
  for (const url of urls) {
    try {
      const bytes = await fetchSource(url)
      const out = path.join(outDir, `${slug}.webp`)
      await sharp(bytes, { failOn: 'error' })
        .resize({width:680,height:680,fit:'contain',background:{r:255,g:255,b:255,alpha:1},withoutEnlargement:true})
        .flatten({background:'#ffffff'})
        .webp({quality:80,effort:5})
        .toFile(out)
      const stat = await fs.stat(out)
      console.log(`[device-photo] ${slug}: OK ${Math.round(stat.size / 1024)} KiB ${url}`)
      return
    } catch (error) {
      lastErr = error
      console.warn(`[device-photo] ${slug}: source failed (${String(error.message || error)}) ${url}`)
    }
  }
  throw new Error(`Failed to download image for ${slug}: ${String(lastErr)}`)
}

async function main() {
  await fs.mkdir(outDir, {recursive:true})
  await Promise.all(products.map(buildImage))
  console.log('[device-photo] All six optimized photos ready to serve locally.')
}
main().catch(err=>{console.error(err);process.exitCode=1})
