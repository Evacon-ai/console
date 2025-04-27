import { countries } from './countries'

export function formatPhoneNumber(phone: string, countryCode: string = 'US'): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  return cleaned
}