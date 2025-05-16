import { Flex } from '@chakra-ui/react'
import { BoxContainer, CustomToolTip, BaseText, TextVariant, TextWeight } from '_components/custom'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'

export const FormContainer = ({ children, title, tooltip }: { children: React.ReactNode; title: string; tooltip?: string; onClick?: () => void }) => {
  return (
    <BoxContainer width={'full'} p={'24px'}>
      <Flex width={'full'} gap={4} alignItems={'center'} justifyContent={'flex-start'}>
        <BaseText variant={TextVariant.L} weight={TextWeight.Bold}>
          {title}
        </BaseText>
        {tooltip && (
          <CustomToolTip message={tooltip}>
            <HiInformationCircle size={18} />
          </CustomToolTip>
        )}
      </Flex>
      {children}
    </BoxContainer>
  )
}
