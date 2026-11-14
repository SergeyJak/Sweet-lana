import { ImageResponse } from 'next/og'
export const runtime = 'nodejs'
export const alt = 'Sweet-lana'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fffaf5', color: '#372b2b', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ fontSize: 82, fontFamily: 'serif' }}>Sweet-lana</div>
      <div style={{ fontSize: 26, marginTop: 20 }}>Coming soon</div>
    </div>, size)
}
