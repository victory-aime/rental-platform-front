import { Box, Center, Flex, Stack } from '@chakra-ui/react'
import { boxStyle } from './style'
import { BaseText, TextVariant } from '../base-text'
import { ActionsButton } from '../button'
import { BaseTooltip, CustomSkeletonLoader, IBoxProps } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { useTranslation } from 'react-i18next'
import { VariablesColors } from '_theme/variables'
import { LuInfo } from 'react-icons/lu'

export const BoxContainer = ({
  title = '',
  description = '',
  withActionButtons = false,
  isFilterActive = false,
  onToggleFilter,
  actionsButtonProps,
  children,
  loader = false,
  numberOfLines = 3,
  tooltip = '',
  filterComponent,
  ...rest
}: IBoxProps) => {
  const { t } = useTranslation()

  if (withActionButtons && !actionsButtonProps) {
    throw new Error('Lorsque vous utiliser withActionButtons, actionsButtonProps est requis')
  }
  const mergedActionsButtonProps = {
    ...actionsButtonProps,
    onToggleFilter,
  }

  return (
    <Box {...boxStyle} {...rest}>
      <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'} gap={5}>
        <Stack gap={2} maxW={{ base: '100%', lg: '800px' }}>
          {loader ? (
            <CustomSkeletonLoader type="TEXT" width={'500px'} numberOfLines={numberOfLines} />
          ) : (
            <>
              {tooltip ? (
                <Flex width={'full'} gap={4} alignItems={'center'} justifyContent={'flex-start'}>
                  <BaseText variant={TextVariant.L}>{t(title)}</BaseText>
                  {tooltip && (
                    <BaseTooltip message={tooltip}>
                      <LuInfo size={14} color={VariablesColors.primary} />
                    </BaseTooltip>
                  )}
                </Flex>
              ) : (
                <BaseText variant={TextVariant.H3}>{t(title)}</BaseText>
              )}
              <BaseText variant={TextVariant.S}>{t(description)}</BaseText>
            </>
          )}
        </Stack>
        {loader && withActionButtons ? (
          <CustomSkeletonLoader type={'BUTTON'} width={'150px'} colorButton={'success'} />
        ) : (
          <>
            {withActionButtons && (
              <Center mt={{ base: '30px', md: '0' }}>
                <ActionsButton {...mergedActionsButtonProps} />
              </Center>
            )}
          </>
        )}
      </Flex>
      {isFilterActive && filterComponent && (
        <Box mt={'30px'} mb={'30px'} bgColor={hexToRGB('lighter', 0.1)} p={15} borderRadius={'7px'} animation={'slideIn'}>
          {filterComponent}
        </Box>
      )}
      <Box {...rest} mt={'50px'}>
        {children}
      </Box>
    </Box>
  )
}
