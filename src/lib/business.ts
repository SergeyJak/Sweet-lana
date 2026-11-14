/** New site's public business details are intentionally unset until supplied. */
export const DEFAULT_SITE_URL = 'http://localhost:3000'
export const BUSINESS = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_SITE_URL,
  streetAddress: 'Dammes iela 46A', addressLocality: 'Riga', postalCode: '', addressCountry: 'LV',
  geo: { latitude: 0, longitude: 0 },
  phoneDisplay: '+371 26830682', phoneE164: '+37126830682', email: '', whatsappNumber: '37126830682',
  instagram: 'https://www.instagram.com/lanasweetperfect/', tiktok: '', facebook: '', priceRange: '',
  googleMapsEmbed: 'https://www.google.com/maps?q=Dammes%20iela%2046A%2C%20Riga%2C%20Latvia&output=embed', googleMapsDirections: 'https://www.google.com/maps/search/?api=1&query=Dammes%20iela%2046A%2C%20Riga%2C%20Latvia',
} as const
export function buildWhatsAppUrl(message: string): string {
  return BUSINESS.whatsappNumber ? `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}` : '#'
}
