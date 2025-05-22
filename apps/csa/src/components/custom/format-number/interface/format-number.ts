import { TYPES } from 'rental-platform-shared-lib'

type StyleNumberFormat = 'decimal' | 'percent' | 'currency'

interface BaseFormatNumberProps {
  value: number
  maximumDigits?: number
  minimumDigits?: number
  notation?: 'compact' | 'standard' | 'scientific' | 'engineering'
  style?: StyleNumberFormat
  currencyCode?: TYPES.ENUM.COMMON.Currency
}

export type { BaseFormatNumberProps }
