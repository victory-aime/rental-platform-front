'use client'

import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaFilter, FaPlus } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { BaseButton } from '../base/baseButton'
import { IoSave } from 'react-icons/io5'
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { ActionButtonTypes } from '_components/custom'
import { GoSync } from 'react-icons/go'
import { useTranslation } from 'react-i18next'

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  requestId,
  isLoading = false,
  cancelColor = 'danger',
  refreshTitle = 'COMMON.REFRESH',
  validateColor = 'success',
  onClick,
  onToggleFilter,
  onReload,
  ...rest
}: ActionButtonTypes) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Flex {...rest} gap={3}>
      {cancelTitle && (
        <BaseButton
          px={'15px'}
          withGradient
          disabled={isLoading}
          colorType={cancelColor}
          leftIcon={cancelColor === 'danger' ? <GiCancel /> : <IoIosArrowDropleftCircle />}
          onClick={() => router?.back()}
        >
          {t(cancelTitle)}
        </BaseButton>
      )}

      {validateTitle && (
        <BaseButton onClick={onClick} px={'15px'} colorType={validateColor} withGradient isLoading={isLoading} disabled={isLoading} leftIcon={requestId ? <IoSave /> : <FaPlus />}>
          {t(validateTitle)}
        </BaseButton>
      )}
      {onReload && (
        <BaseButton onClick={onReload} px={'15px'} colorType={'primary'} withGradient isLoading={isLoading} disabled={isLoading} leftIcon={<GoSync />}>
          {t(refreshTitle)}
        </BaseButton>
      )}
      {onToggleFilter && (
        <BaseButton px={'15px'} colorType={'secondary'} withGradient leftIcon={<FaFilter />} onClick={onToggleFilter}>
          {t('COMMON.FILTER')}
        </BaseButton>
      )}
    </Flex>
  )
}
