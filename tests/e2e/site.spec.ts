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
    await expect(page.getByRole('heading', { level: 1 })).toContainText(locale === 'ru' ? 'Светлана Петрова' : 'Svetlana Petrova')
    await expect(page.locator('a[href="tel:+37126830682"]').first()).toBeVisible()
    await expect(page.locator('a[href="https://www.instagram.com/lanasweetperfect/"]').first()).toBeVisible()
    const broken = await page.evaluate(() => Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]'))
      .filter(link => link.origin === location.origin && link.pathname === location.pathname && link.hash.length > 1)
      .filter(link => !document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .map(link => link.getAttribute('href')))
    expect(broken).toEqual([])
    await page.locator(`#cabinets a[href="/${locale}/cabinet/imanta"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/cabinet/imanta$`))
    await expect(page.locator('a[href*="wa.me/"][href*="text="]').first()).toBeVisible()
    await expect(page.locator('iframe')).toHaveCount(1)
    await page.locator(`main a[href="/${locale}/cabinet/center"]`).last().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('iframe')).toHaveCount(0)
    await page.locator('main a[href="#gallery"]').click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/cabinet/center#gallery$`))
    await expect(page.locator('#cabinet-gallery-heading')).toBeInViewport()
    const mobile = page.locator('header details').last()
    const desktop = page.locator('header details').first()
    const menu = await mobile.locator('summary').isVisible() ? mobile : desktop
    await menu.locator('summary').click()
    await menu.locator(`a[href="/${locale}/cabinet/imanta#gallery"]`).click()
    await expect(page).toHaveURL(new RegExp(`/${locale}/cabinet/imanta#gallery$`))
    await expect(page.locator('#cabinet-gallery-heading')).toBeInViewport()
    if (await mobile.locator('summary').isVisible()) {
      await mobile.locator('summary').click()
      await expect(mobile.locator('a[hreflang="en"]')).toHaveAttribute('href', '/en/cabinet/imanta#gallery')
      await mobile.locator('a[hreflang="en"]').click()
    } else {
      await expect(page.locator('header > div > nav a[hreflang="en"]')).toHaveAttribute('href', '/en/cabinet/imanta#gallery')
      await page.locator('header > div > nav a[hreflang="en"]').click()
    }
    await expect(page).toHaveURL(/\/en\/cabinet\/imanta#gallery$/)
    expect(errors).toEqual([])
  })
}

test('small-screen menu opens the correct cabinet gallery and pages do not overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile navigation only')
  await page.goto('/ru')
  const menu = page.locator('header details').last()
  await menu.locator('summary').click()
  await expect(menu).toHaveAttribute('open', '')
  await menu.locator('a[href="/ru/cabinet/center#gallery"]').click()
  await expect(page).toHaveURL(/\/ru\/cabinet\/center#gallery$/)
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

for (const width of [320, 360, 375, 390, 430]) {
  test(`header controls fit a ${width}px mobile viewport`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile layout regression')
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ru')
    const clipped = await page.locator('header').evaluate(header =>
      Array.from(header.querySelectorAll('a, summary, button'))
        .filter(el => el.checkVisibility())
        .filter(el => { const r = el.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth })
        .map(el => el.textContent?.trim()))
    expect(clipped).toEqual([])
  })
}

test('long Russian cabinet heading stays inside the content on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/ru/cabinet/center')
  const textRight = await page.locator('h1').evaluate(el => {
    const range = document.createRange()
    range.selectNodeContents(el)
    return Math.max(...Array.from(range.getClientRects(), rect => rect.right))
  })
  expect(textRight).toBeLessThanOrEqual(300)
})

test('selecting a mobile menu section closes the panel', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile menu regression')
  await page.setViewportSize({ width: 430, height: 932 })
  await page.goto('/ru')
  const menu = page.locator('header details').last().last()
  await menu.locator('summary').click()
  await menu.locator('a[href$="#skincare"]').click()
  await expect(page).toHaveURL(/#skincare$/)
  await expect(menu).not.toHaveAttribute('open', '')
})

test('mobile menu can close with Escape or an outside tap', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile interaction')
  await page.goto('/en')
  const menu = page.locator('header details').last()
  await menu.locator('summary').click()
  await page.keyboard.press('Escape')
  await expect(menu).not.toHaveAttribute('open', '')
  await expect(menu.locator('summary')).toBeFocused()
  await menu.locator('summary').click()
  await page.locator('header > div > a').click({ position: { x: 10, y: 10 } })
  await expect(menu).not.toHaveAttribute('open', '')
})

test('landscape menu scrolls above the contact bar and keeps its last link reachable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Phone landscape')
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/en')
  const menu = page.locator('header details').last()
  await menu.locator('summary').click()
  const panel = menu.locator(':scope > div')
  const panelBox = await panel.boundingBox()
  const barBox = await page.locator('nav[aria-label="WhatsApp and Instagram"]').boundingBox()
  expect(panelBox!.y + panelBox!.height).toBeLessThanOrEqual(barBox!.y)
  expect(await panel.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true)
  await menu.locator('a[href="/en#contact"]').click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(menu).not.toHaveAttribute('open', '')
})

test('header stays visible when navigating to the skincare section', async ({ page }) => {
  await page.goto('/en#skincare')
  await expect.poll(async () => Math.round((await page.locator('header').boundingBox())!.y)).toBe(0)
})
