// Populate only with real diplomas and certificates supplied by Svetlana.
// Store web-optimised files under /public/certificates/; never invent credentials.
export type CertificateCategory = 'education' | 'cosmetology' | 'equipment' | 'training'

export interface Certificate {
  id: string
  category: CertificateCategory
  image: string
  title: { ru: string; lv: string; en: string }
  institution?: string
  year?: string
}

export const CERTIFICATES: Certificate[] = []
