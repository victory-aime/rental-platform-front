import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ButtonBaseProps, VariantColorStyle } from '_components/custom'
import { HStack } from '@chakra-ui/react'
import { LoadingDots } from '../animation/loadingDots'
import { useTranslation } from 'react-i18next'
import { Colors, getColor, getGradient, getHoverGradient } from '_theme/colors'

const getVariantStyles = (colorType: keyof Colors): VariantColorStyle => {
  return {
    bg: getColor(colorType, 500),
    gradient: getGradient(colorType),
    hover: getHoverGradient(colorType),
    textColor: 'white',
  }
}

const BaseButton: FC<ButtonBaseProps> = ({ children, withGradient = false, rightIcon, colorType, status, isLoading = false, leftIcon, ...rest }) => {
  const { t } = useTranslation()
  const { bg, gradient, hover, textColor } = getVariantStyles(colorType || 'primary')

  return (
    <>
      {rightIcon ? (
        <HStack>
          <Button
            position={'relative'}
            variant={rest.variant}
            bg={withGradient ? gradient : (bg ?? 'none')}
            color={textColor}
            _hover={{
              background: withGradient ? hover : `${bg}CC`,
            }}
            _active={{ background: withGradient ? hover : `${bg}AA` }}
            _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
            borderRadius={'7px'}
            padding={'20px'}
            loading={isLoading}
            disabled={isLoading}
            loadingText={t('LOADING_TEXT.LOADING_TEXT')}
            spinner={<LoadingDots />}
            spinnerPlacement={'end'}
            {...rest}
          >
            {children}
            {rightIcon}
          </Button>
        </HStack>
      ) : leftIcon ? (
        <HStack>
          <Button
            position={'relative'}
            variant={rest.variant}
            bg={withGradient ? gradient : (bg ?? 'none')}
            color={textColor}
            _hover={{
              background: withGradient ? hover : `${bg}CC`,
            }}
            _active={{ background: withGradient ? hover : `${bg}AA` }}
            _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
            borderRadius={'7px'}
            padding={'20px'}
            loading={isLoading}
            disabled={isLoading}
            loadingText={t('COMMON.LOADING_TEXT')}
            spinner={<LoadingDots />}
            spinnerPlacement={'end'}
            {...rest}
          >
            {leftIcon}
            {children}
          </Button>
        </HStack>
      ) : (
        <Button
          pos="relative"
          bg={withGradient ? gradient : (bg ?? 'none')}
          color={textColor}
          padding={'20px'}
          _hover={{
            background: withGradient ? hover : `${bg}CC`,
          }}
          _active={{ background: withGradient ? hover : `${bg}AA` }}
          _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
          borderRadius={'7px'}
          loading={isLoading}
          disabled={isLoading}
          loadingText={t('COMMON.LOADING_TEXT')}
          spinner={<LoadingDots />}
          spinnerPlacement="end"
          {...rest}
        >
          {children}
        </Button>
      )}
    </>
  )
}

export { getVariantStyles, BaseButton }
