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

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  goBackUrl,
  requestId,
  isLoading = false,
  cancelColor = 'danger',
  refreshTitle = 'Rafraichir les donnees',
  validateColor = 'success',
  onClick,
  onToggleFilter,
  ...rest
}: ActionButtonTypes) => {
  if (cancelTitle && !goBackUrl) {
    throw new Error('goBackUrl is missing')
  }
  const router = useRouter()

  return (
    <Flex {...rest} gap={3}>
      {cancelTitle && (
        <BaseButton
          px={'15px'}
          withGradient
          colorType={cancelColor}
          leftIcon={cancelColor === 'danger' ? <GiCancel /> : <IoIosArrowDropleftCircle />}
          onClick={() => {
            router.push(goBackUrl ?? '')
          }}
        >
          {cancelTitle}
        </BaseButton>
      )}

      {validateTitle && (
        <BaseButton onClick={onClick} px={'15px'} colorType={validateColor} withGradient isLoading={isLoading} disabled={isLoading} leftIcon={requestId ? <IoSave /> : <FaPlus />}>
          {validateTitle}
        </BaseButton>
      )}
      {rest.onReload && (
        <BaseButton onClick={rest.onReload} px={'15px'} colorType={'primary'} withGradient isLoading={isLoading} disabled={isLoading} leftIcon={<GoSync />}>
          {refreshTitle}
        </BaseButton>
      )}
      {onToggleFilter && (
        <BaseButton px={'15px'} colorType={'secondary'} withGradient leftIcon={<FaFilter />} onClick={onToggleFilter}>
          Filtrer
        </BaseButton>
      )}
    </Flex>
  )
}
