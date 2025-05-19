import { FormatNumber } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { CustomFormatNumberProps } from './interface/format-number'
import { TYPES } from 'rental-platform-shared'
import { ModalComponent } from '../modal'
import { CiWarning } from 'react-icons/ci'
import { VariablesColors } from '_theme/variables'
import { BaseText, TextVariant } from '../base-text'

const CustomFormatNumber: FC<CustomFormatNumberProps> = ({ value, notation = 'compact', style = 'currency', currencyCode = TYPES.ENUM.Currency.USD, maximumDigits, minimumDigits }) => {
  const [isInValidCurrency, setIsInvalidCurrency] = useState(false)
  const isCurrency = (value: any): value is TYPES.ENUM.Currency => Object.values(TYPES.ENUM.Currency).includes(value)

  useEffect(() => {
    if (!isCurrency(currencyCode)) {
      setIsInvalidCurrency(true)
    } else {
      setIsInvalidCurrency(false)
    }
  }, [currencyCode])

  return (
    <>
      <FormatNumber
        value={value}
        notation={notation}
        style={style}
        currency={currencyCode}
        maximumFractionDigits={style === 'percent' ? maximumDigits : 0}
        minimumFractionDigits={style === 'percent' ? minimumDigits : 0}
      />
      <ModalComponent title={'Attention'} icon={<CiWarning />} iconBackgroundColor={VariablesColors.orange} open={isInValidCurrency} ignoreFooter>
        <BaseText variant={TextVariant.M}>Le code de la devise fournie n'est pas valide, veuillez utiliser l'un des codes de devise valides fournis par le système.</BaseText>
        <BaseText>Voici la liste des codes de devise valides: {Object.values(TYPES.ENUM.Currency).join(', ')}</BaseText>
        <BaseText>Devise fournie: {currencyCode}</BaseText>
        <BaseText>NB : Ce popup se fermera automatiquement lorsque vous aurez changer la devise</BaseText>
      </ModalComponent>
    </>
  )
}

export default CustomFormatNumber
