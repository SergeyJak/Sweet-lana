import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'
import * as login from '@/app/api/auth/login/route'
import * as logout from '@/app/api/auth/logout/route'
import * as booking from '@/app/api/booking/route'
import * as content from '@/app/api/admin/content/route'
import * as gallery from '@/app/api/admin/gallery/route'
import * as categories from '@/app/api/admin/gallery-categories/route'

beforeEach(() => {
  vi.stubEnv('ENABLE_ADMIN', '')
  vi.stubEnv('ENABLE_PUBLIC_GALLERY', '')
  vi.stubEnv('ENABLE_BOOKING_API', '')
  // Credentials alone must never expose dormant features.
  vi.stubEnv('ADMIN_USERNAME', 'admin')
  vi.stubEnv('ADMIN_PASSWORD', 'test-password')
})
afterEach(() => vi.unstubAllEnvs())

describe('dormant routes', () => {
  it.each(['/admin', '/login', '/api/admin/content', '/api/admin/gallery', '/api/admin/gallery-categories', '/api/auth/login', '/api/auth/logout', '/api/booking'])(
    'returns 404 for %s even with configured credentials', async (path) => {
      const response = await proxy(new NextRequest(`http://localhost${path}`))
      expect(response.status).toBe(404)
      expect(response.headers.get('location')).toBeNull()
      expect(response.headers.get('set-cookie')).toBeNull()
    }
  )

  const handlers = [
    ['login POST', login.POST], ['logout POST', logout.POST],
    ['booking POST', booking.POST],
    ...Object.entries(content), ...Object.entries(gallery), ...Object.entries(categories),
  ].filter((entry) => typeof entry[1] === 'function') as Array<[string, (request: NextRequest) => Promise<Response>]>

  it.each(handlers)('guards direct handler %s before parsing or calling services', async (_name, handler) => {
    const request = new NextRequest('http://localhost/api/unused', { method: 'POST', body: 'invalid json' })
    const response = await handler(request)
    expect(response.status).toBe(404)
    expect(request.bodyUsed).toBe(false)
  })

  it('keeps gallery navigation public while admin and booking are disabled', async () => {
    const response = await proxy(new NextRequest('http://localhost/en/gallery'))
    expect(response.status).toBe(200)
  })

  it('restores session protection when admin is explicitly enabled', async () => {
    vi.stubEnv('ENABLE_ADMIN', 'true')
    expect((await proxy(new NextRequest('http://localhost/api/admin/gallery'))).status).toBe(401)
    expect((await proxy(new NextRequest('http://localhost/admin'))).headers.get('location')).toContain('/login?')
    expect((await proxy(new NextRequest('http://localhost/login'))).status).toBe(200)
  })

  it('does not enable admin for truthy-looking strings', async () => {
    vi.stubEnv('ENABLE_ADMIN', 'false')
    expect((await proxy(new NextRequest('http://localhost/login'))).status).toBe(404)
    vi.stubEnv('ENABLE_ADMIN', '1')
    expect((await proxy(new NextRequest('http://localhost/login'))).status).toBe(404)
  })
})
