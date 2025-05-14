import { TYPES } from "platform-shared"

type StyleNumberFormat = 'decimal' | 'percent' | 'currency'

interface CustomFormatNumberProps {
  value: number
  maximumDigits?: number
  minimumDigits?: number
  notation?: 'compact' | 'standard' | 'scientific' | 'engineering'
  style?: StyleNumberFormat
  currencyCode?:  TYPES.ENUM.Currency
}

export type { CustomFormatNumberProps }
