/** Server-only opt-ins. Read at request time; credentials never enable features. */
export function isAdminEnabled(): boolean {
  return process.env.ENABLE_ADMIN === 'true'
}

export function isGalleryEnabled(): boolean {
  return process.env.ENABLE_PUBLIC_GALLERY === 'true'
}

export function isBookingEnabled(): boolean {
  return process.env.ENABLE_BOOKING_API === 'true'
}
