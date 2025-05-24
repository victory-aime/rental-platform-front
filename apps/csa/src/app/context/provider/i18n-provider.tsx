'use client'
import { i18nInit } from '_hooks/i18n'
import React, { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { LOCALE } from 'rental-platform-shared'

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  i18nInit()
  return <I18nextProvider i18n={LOCALE.I18n}>{children}</I18nextProvider>
}
