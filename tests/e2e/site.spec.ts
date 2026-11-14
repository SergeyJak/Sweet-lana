import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Exercise our site without contacting maps or tracking services.
  await page.route(/https:\/\/(www\.google\.com\/maps|www\.googletagmanager\.com|connect\.facebook\.net)/,
    route => route.fulfill({ contentType: 'text/html', body: '' }))
})

for (const locale of ['lv', 'ru', 'en']) {
  test(`${locale}: home, locations, gallery and language navigation`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`/${locale}`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Lana Sweet Perfect')
    await expect(page.locator('a[href="tel:+37126830682"]').first()).toBeVisible()
    await expect(page.locator('a[href="https://www.instagram.com/lanasweetperfect/"]').first()).toBeVisible()
    const broken = await page.evaluate(() => Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]'))
      .filter(link => link.origin === location.origin && link.pathname === location.pathname && link.hash.length > 1)
      .filter(link => !document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .map(link => link.getAttribute('href')))
    expect(broken).toEqual([])
    await page.locator(`a[href="/${locale}/cabinet/imanta"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/cabinet/imanta$`))
    await expect(page.locator('a[href*="wa.me/"][href*="text="]').first()).toBeVisible()
    await expect(page.locator('iframe')).toHaveCount(1)
    await page.locator(`a[href="/${locale}/cabinet/center"]`).click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('iframe')).toHaveCount(0)
    await page.locator(`a[href="/${locale}/gallery"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/gallery$`))
    await expect(page.locator('img')).toHaveCount(0)
    await page.locator('a[href="/en/gallery"]').click()
    await expect(page).toHaveURL(/\/en\/gallery$/)
    expect(errors).toEqual([])
  })
}

test('small-screen menu opens gallery and pages do not overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile navigation only')
  await page.goto('/ru')
  const menu = page.locator('header details')
  await menu.locator('summary').click()
  await expect(menu).toHaveAttribute('open', '')
  await menu.locator('a[href="/ru/gallery"]').click()
  await expect(page).toHaveURL(/\/ru\/gallery$/)
  for (const path of ['/ru', '/ru/gallery', '/ru/cabinet/imanta', '/ru/cabinet/center']) {
    await page.goto(path)
    const dimensions = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth,
    }))
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1)
  }
})

test('root redirect remembers the selected locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/lv$/)
  await page.goto('/en')
  await page.goto('/')
  await expect(page).toHaveURL(/\/en$/)
})

test('optional routes remain unavailable without explicit activation', async ({ request }) => {
  for (const path of ['/admin', '/login', '/api/admin/content', '/api/admin/gallery', '/api/admin/gallery-categories']) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(404)
    expect(response.headers()['location']).toBeUndefined()
  }
  for (const path of ['/api/auth/login', '/api/auth/logout', '/api/booking']) {
    expect((await request.post(path, { data: {} })).status(), path).toBe(404)
  }
})

test('pre-launch pages stay out of search and unsupported routes return 404', async ({ page, request }) => {
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /')
  await page.goto('/en')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  expect((await request.get('/en/cabinet/unknown')).status()).toBe(404)
  expect((await request.get('/de')).status()).toBe(404)
})
