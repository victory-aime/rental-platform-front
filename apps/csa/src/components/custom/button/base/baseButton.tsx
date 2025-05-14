import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ButtonBaseProps, VariantColorStyle, variantColorType } from '_components/custom'
import { HStack } from '@chakra-ui/react'
import { LoadingDots } from '../animation/loadingDots'

const getVariantStyles: any = (colorType: variantColorType): VariantColorStyle => {
  switch (colorType) {
    case 'primary':
      return {
        bg: 'rgb(26, 60, 138)',
        gradient: 'linear-gradient(to right, rgb(26, 60, 138), rgb(13, 98, 172))',
        hover: 'linear-gradient(to right, rgb(34, 76, 158), rgb(18, 115, 195))',
        textColor: 'white',
      }
    case 'secondary':
      return {
        bg: 'rgb(255, 168, 0)',
        gradient: 'linear-gradient(to right, rgb(255, 168, 0), rgb(255, 136, 0))',
        hover: 'linear-gradient(to right, rgb(255, 184, 28), rgb(255, 152, 28))',
        textColor: 'white',
      }
    case 'danger':
      return {
        bg: 'rgb(200, 57, 98)',
        gradient: 'linear-gradient(to right, rgb(200, 57, 98), rgb(138, 21, 56))',
        hover: 'linear-gradient(to right, rgb(220, 77, 118), rgb(158, 41, 76))',
        textColor: 'white',
      }
    case 'success':
      return {
        bg: 'rgb(3, 186, 153)',
        gradient: 'linear-gradient(to right, rgb(3, 186, 153), rgb(0, 145, 119))',
        hover: 'linear-gradient(to right, rgb(23, 206, 173), rgb(0, 165, 79))',
        textColor: 'white',
      }
    default:
      return {
        bg: 'rgb(0, 0, 0)',
        gradient: 'linear-gradient(to right, rgb(0, 0, 0), rgb(50, 50, 50))',
        hover: 'linear-gradient(to right, rgb(30, 30, 30), rgb(80, 80, 80))',
        textColor: 'white',
      }
  }
}

const getVariantFromStatus = (status?: string): variantColorType | undefined => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'danger'
    default:
      return 'success'
  }
}

export const BaseButton: FC<ButtonBaseProps> = ({ children, withGradient = false, rightIcon, colorType, status, animation, isLoading = false, leftIcon, ...rest }) => {
  const resolvedVariant: variantColorType = status ? getVariantFromStatus(status) || 'none' : colorType || 'none'

  const { bg, gradient, hover, textColor } = getVariantStyles(resolvedVariant || 'none')

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
            loadingText={'patientez'}
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
            loadingText={'patientez'}
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
          borderRadius="7px"
          loading={isLoading}
          disabled={isLoading}
          loadingText="patientez"
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
