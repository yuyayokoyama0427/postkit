const STORAGE_KEY = 'postkit_license'
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isProFromStorage(): boolean {
  const key = localStorage.getItem(STORAGE_KEY)
  return key !== null && UUID_REGEX.test(key)
}

export function saveLicense(key: string) {
  localStorage.setItem(STORAGE_KEY, key)
}

export function clearLicense() {
  localStorage.removeItem(STORAGE_KEY)
}

export async function validateLicense(key: string): Promise<boolean> {
  try {
    const res = await fetch('/api/validate-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
    const data = await res.json() as { valid: boolean }
    if (data.valid) saveLicense(key)
    return data.valid
  } catch {
    return false
  }
}
