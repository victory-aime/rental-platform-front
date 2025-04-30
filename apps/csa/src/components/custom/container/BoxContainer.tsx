import { Box, Flex, Stack } from '@chakra-ui/react'
import { boxStyle } from './style'
import { BaseText, TextVariant } from '../base-text'
import { ActionsButton } from '../button'
import { CustomSkeletonLoader, IBoxProps } from '_components/custom'

export const BoxContainer = ({ title, description, withActionButtons = false, actionsButtonProps, children, loader = false, numberOfLines = 3, ...rest }: IBoxProps) => {
  if (withActionButtons && !actionsButtonProps) {
    throw new Error('Lorsque vous utiliser withActionButtons, actionsButtonProps est requis')
  }
  return (
    <Box {...boxStyle} {...rest}>
      <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'} gap={5}>
        <Stack gap={2} maxW={{ base: '100%', lg: '800px' }}>
          {loader ? (
            <CustomSkeletonLoader type="TEXT" width={'500px'} numberOfLines={numberOfLines} />
          ) : (
            <>
              <BaseText variant={TextVariant.H3}>{title}</BaseText>
              <BaseText variant={TextVariant.M}>{description}</BaseText>
            </>
          )}
        </Stack>
        {loader && withActionButtons ? <CustomSkeletonLoader type={'BUTTON'} width={'150px'} colorButton={'success'} /> : <>{withActionButtons && <ActionsButton {...actionsButtonProps} />}</>}
      </Flex>
      {children}
    </Box>
  )
}
