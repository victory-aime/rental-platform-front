'use client'
import { StorageKey } from '_constants/StorageKeys'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeColorContextType {
  primaryColor: string
  setPrimaryColor: (color: string) => void
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined)

export const ThemeColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    return localStorage.getItem(StorageKey.THEME_COLOR_KEY) || '#38a2f9'
  })

  useEffect(() => {
    localStorage.setItem(StorageKey.THEME_COLOR_KEY, primaryColor)
  }, [primaryColor])

  return <ThemeColorContext.Provider value={{ primaryColor, setPrimaryColor }}>{children}</ThemeColorContext.Provider>
}

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext)
  if (!context) {
    throw new Error('useThemeColor must be used within ThemeColorProvider')
  }
  return context
}
