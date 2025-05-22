import { FormatNumber } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { BaseFormatNumberProps } from './interface/format-number'
import { TYPES } from 'rental-platform-shared'
import { ModalComponent } from '../modal'
import { CiWarning } from 'react-icons/ci'
import { VariablesColors } from '_theme/variables'
import { BaseText, TextVariant } from '../base-text'

export const BaseFormatNumber: FC<BaseFormatNumberProps> = ({ value, notation = 'standard', style = 'currency', currencyCode = TYPES.ENUM.COMMON.Currency.XAF, maximumDigits, minimumDigits }) => {
  const [isInValidCurrency, setIsInvalidCurrency] = useState(false)
  const isCurrency = (value: any): value is TYPES.ENUM.COMMON.Currency => Object.values(TYPES.ENUM.COMMON.Currency).includes(value)

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
        <BaseText>Voici la liste des codes de devise valides: {Object.values(TYPES.ENUM.COMMON.Currency).join(', ')}</BaseText>
        <BaseText>Devise fournie: {currencyCode}</BaseText>
        <BaseText>NB : Ce popup se fermera automatiquement lorsque vous aurez changer la devise</BaseText>
      </ModalComponent>
    </>
  )
}
