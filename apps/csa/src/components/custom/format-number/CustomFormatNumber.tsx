import { FormatNumber, LocaleProvider } from '@chakra-ui/react'
import { FC } from 'react'
import { CustomFormatNumberProps } from './interface/format-number'

const CustomFormatNumber: FC<CustomFormatNumberProps> = ({ value, notation = 'compact', style = 'currency', currencyCode = 'USD', maximumDigits, minimumDigits, isLocale = true }) => {
  return (
    <>
      {isLocale ? (
        <FormatNumber
          value={value}
          notation={notation}
          style={style}
          maximumFractionDigits={style === 'percent' ? maximumDigits : 2}
          minimumFractionDigits={style === 'percent' ? minimumDigits : 2}
          currency={currencyCode}
        />
      ) : (
        <LocaleProvider locale={navigator.language}>
          <FormatNumber value={value} />
        </LocaleProvider>
      )}
    </>
  )
}

export default CustomFormatNumber
