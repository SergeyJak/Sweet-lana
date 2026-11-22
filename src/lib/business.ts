/** Shared details for the new site; unconfirmed fields stay empty. */
export const DEFAULT_SITE_URL = 'https://lanasweet.heysmart.lv'
// Verified Sweet Perfect listing: use its Place ID for links to the actual business.
const SWEET_PERFECT_MAPS_PLACE_URL = 'https://www.google.com/maps/search/?api=1&query=Sweet%20Perfect%20Kosmetologs%20Vaksacija&query_place_id=ChIJS-9SPebF7kYR7-LRQgp4ifY'

export const BUSINESS = {
  name: 'Lana Sweet Perfect',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_SITE_URL,
  streetAddress: 'Dammes iela 46A', addressLocality: 'Riga', postalCode: '', addressCountry: 'LV',
  centerStreetAddress: 'Hanzas iela 18',
  centerGoogleMapsEmbed: 'https://www.google.com/maps?q=Hanzas%20iela%2018%2C%20Riga%2C%20Latvia&output=embed',
  geo: { latitude: 0, longitude: 0 },
  phoneDisplay: '+371 26830682', phoneE164: '+37126830682', email: '', whatsappNumber: '37126830682',
  googleReviewsUrl: SWEET_PERFECT_MAPS_PLACE_URL,
  instagram: 'https://www.instagram.com/lanasweetperfect/', tiktok: '', facebook: '', priceRange: '',
  // Classic keyless embed resolves the business by its complete Maps listing name and address,
  // rather than dropping an anonymous pin on the street address.
  googleMapsEmbed: 'https://www.google.com/maps?q=Sweet%20Perfect%20-%20Kosmetologs%20%7C%20Vaks%C4%81cija%2C%20Dammes%20iela%2046A%2C%20R%C4%ABga%2C%20Latvia&output=embed',
  googleMapsDirections: SWEET_PERFECT_MAPS_PLACE_URL,
} as const
export function buildWhatsAppUrl(message = ''): string {
  return BUSINESS.whatsappNumber ? `https://wa.me/${BUSINESS.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}` : '#'
}
