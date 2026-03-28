import { useState, useEffect } from 'react'

interface Profile {
  displayName: string
  handle: string
}

const STORAGE_KEY = 'postkit_profile'
const DEFAULT: Profile = { displayName: 'PostKit User', handle: 'postkit_user' }

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...DEFAULT, ...JSON.parse(saved) }
    } catch {}
    return DEFAULT
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {}
  }, [profile])

  function updateProfile(updates: Partial<Profile>) {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  return { profile, updateProfile }
}
