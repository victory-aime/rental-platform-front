import { StorageKey } from '_constants/StorageKeys'
import { useEffect, useState } from 'react'

export const usePrimaryColor = () => {
  const getStoredColor = () => localStorage.getItem(StorageKey.THEME_COLOR_KEY) || '#2285ee'

  const [primaryColor, setPrimaryColor] = useState<string>(getStoredColor)

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === StorageKey.THEME_COLOR_KEY && e.newValue) {
        setPrimaryColor(e.newValue)
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const updateColor = (color: string) => {
    localStorage.setItem(StorageKey.THEME_COLOR_KEY, color)
    setPrimaryColor(color)
  }

  return { primaryColor, setPrimaryColor: updateColor }
}
