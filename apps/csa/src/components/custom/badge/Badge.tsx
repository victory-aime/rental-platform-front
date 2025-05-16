import { Badge } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Props } from './interface/badge'
import { BaseText, TextVariant } from '../base-text'
import { variantColorType, getVariantStyles } from '../button'
import { TYPES } from 'rental-platform-shared'
const getBadgeContent = (status?: string, type?: string): { variant: variantColorType; label: string } => {
  if (type === 'cars') {
    switch (status) {
      case TYPES.ENUM.VehicleStatus.AVAILABLE:
        return { variant: 'success', label: 'Disponible' }
      case TYPES.ENUM.VehicleStatus.MAINTENANCE:
        return { variant: 'warning', label: 'En maintenance' }
      case TYPES.ENUM.VehicleStatus.UNAVAILABLE:
        return { variant: 'danger', label: 'Indisponible' }
      default:
        return { variant: 'none', label: 'Inconnu' }
    }
  } else {
    switch (status) {
      case TYPES.ENUM.CommonBookingStatus.ACTIVE:
        return { variant: 'success', label: 'Actif' }
      case TYPES.ENUM.CommonBookingStatus.PENDING:
        return { variant: 'warning', label: 'En attente' }
      case TYPES.ENUM.CommonBookingStatus.EXPIRED:
        return { variant: 'none', label: 'Expiré' }
      case TYPES.ENUM.CommonBookingStatus.CANCELED:
        return { variant: 'danger', label: 'Annulé' }
      default:
        return { variant: 'warning', label: 'Inconnu' }
    }
  }
}

export const BaseBadge: FC<Props> = ({ children, variant = 'solid', label: customLabel, color = '', type = 'cars', status, ...props }) => {
  const { variant: resolvedVariant, label: resolvedLabel } = getBadgeContent(status, type)
  const { bg, gradient, hover, textColor } = getVariantStyles(resolvedVariant)

  return (
    <Badge
      {...props}
      variant={variant}
      size="lg"
      borderRadius="7px"
      p={'10px'}
      bg={gradient ?? bg ?? 'none'}
      color={textColor}
      _hover={{ background: hover ?? `${bg}CC` }}
      _active={{ background: hover ?? `${bg}AA` }}
      _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
    >
      <BaseText variant={TextVariant.S} textTransform="capitalize">
        {customLabel ?? resolvedLabel}
      </BaseText>
    </Badge>
  )
}
