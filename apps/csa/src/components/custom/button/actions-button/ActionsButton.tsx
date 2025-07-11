'use client'

import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BaseButton } from '../base/baseButton'
import { IoIosClose } from 'react-icons/io'
import { ActionButtonTypes } from '_components/custom'
import { useTranslation } from 'react-i18next'
import { HiMiniPlusSmall } from 'react-icons/hi2'
import { CiSaveDown2, CiFilter } from 'react-icons/ci'
import { CgSync } from 'react-icons/cg'

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  requestId,
  isLoading = false,
  cancelColor = 'danger',
  refreshTitle = 'COMMON.REFRESH',
  validateColor = 'primary',
  icon,
  cancelIcon,
  onClick,
  onToggleFilter,
  onReload,
  onCancel,
  ...rest
}: ActionButtonTypes) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Flex {...rest} gap={3}>
      {isLoading ? (
        <BaseButton isLoading={isLoading} />
      ) : (
        <>
          {cancelTitle && (
            <BaseButton
              px={'15px'}
              withGradient
              disabled={isLoading}
              colorType={cancelColor}
              leftIcon={cancelIcon ? cancelIcon : <IoIosClose />}
              onClick={() => (onCancel ? onCancel?.() : router?.back())}
            >
              {t(cancelTitle)}
            </BaseButton>
          )}

          {validateTitle && (
            <BaseButton
              onClick={onClick}
              px={'15px'}
              colorType={validateColor}
              withGradient
              isLoading={isLoading}
              disabled={isLoading}
              leftIcon={icon ? icon : requestId ? <CiSaveDown2 /> : <HiMiniPlusSmall />}
            >
              {t(validateTitle)}
            </BaseButton>
          )}
          {onReload && (
            <BaseButton onClick={onReload} px={'15px'} colorType={'secondary'} withGradient isLoading={isLoading} disabled={isLoading} leftIcon={<CgSync size={14} />}>
              {t(refreshTitle)}
            </BaseButton>
          )}
          {onToggleFilter && (
            <BaseButton px={'15px'} colorType={'tertiary'} withGradient leftIcon={<CiFilter />} onClick={onToggleFilter}>
              {t('COMMON.FILTER')}
            </BaseButton>
          )}
        </>
      )}
    </Flex>
  )
}
