const assert = require('node:assert/strict')
const { routes } = require('../.next/prerender-manifest.json')

for (const locale of ['lv', 'ru', 'en']) {
  for (const path of ['', '/certificates', '/cabinet/imanta', '/cabinet/center']) {
    const route = `/${locale}${path}`
    assert.ok(Object.hasOwn(routes, route), `Missing prerendered page: ${route}`)
  }

  const gallery = `/${locale}/gallery`
  assert.ok(!Object.hasOwn(routes, gallery), `Gallery must stay dynamic: ${gallery}`)
}
