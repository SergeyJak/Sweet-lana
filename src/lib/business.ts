/** New site's public business details are intentionally unset until supplied. */
export const DEFAULT_SITE_URL = 'http://localhost:3000'
export const BUSINESS = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_SITE_URL,
  streetAddress: '', addressLocality: 'Riga', postalCode: '', addressCountry: 'LV',
  geo: { latitude: 0, longitude: 0 },
  phoneDisplay: '+371 26830682', phoneE164: '+37126830682', email: '', whatsappNumber: '37126830682',
  instagram: 'https://www.instagram.com/lanasweetperfect/', tiktok: '', facebook: '', priceRange: '',
  googleMapsEmbed: '', googleMapsDirections: '',
} as const
export function buildWhatsAppUrl(message: string): string {
  return BUSINESS.whatsappNumber ? `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}` : '#'
}
