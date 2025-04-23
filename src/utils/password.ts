// Generate a secure random password
export function generateRandomPassword(length = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length]
  }
  
  // Ensure password contains at least one of each required character type
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*]/.test(password)
  
  if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
    // If missing any required character type, generate a new password
    return generateRandomPassword(length)
  }
  
  return password
}