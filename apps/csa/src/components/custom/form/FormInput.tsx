import React from 'react'
import { useField } from 'formik'
import { Input, Field, Flex } from '@chakra-ui/react'
import { TextInputProps } from './interface/input'
import { InputGroup } from '_components/ui/input-group'
import { TbLockBitcoin } from 'react-icons/tb'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BaseText, BaseTooltip, CustomSkeletonLoader } from '_components/custom'
import { useTranslation } from 'react-i18next'

const FormTextInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  infoMessage = '',
  required = false,
  isReadOnly = false,
  isDisabled = false,
  rightAccessory,
  leftAccessory,
  customRadius,
  accept,
  height = '45px',
  validate,
  toolTipInfo,
  isLoading,
}: TextInputProps) => {
  const { t } = useTranslation()
  const fieldHookConfig = {
    name,
    validate,
  }
  const [field, { touched, error }] = useField(fieldHookConfig)
  const isError = isReadOnly ? Boolean(error) : touched && Boolean(error)
  const isPassword = type === 'password'

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label display={'flex'} gap={'6px'} fontSize={{ base: '14px', md: '12px' }}>
          {isLoading ? (
            <CustomSkeletonLoader type="TEXT" numberOfLines={1} />
          ) : (
            <>
              {t(label)}
              {required && <BaseText color={'red'}> * </BaseText>}
            </>
          )}
        </Field.Label>
      )}

      {isLoading ? (
        <CustomSkeletonLoader type="FORM" height={height} width={'100%'} />
      ) : (
        <InputGroup
          flex={1}
          width={'full'}
          startElement={
            isPassword ? (
              <Flex alignItems={'flex-start'} justifyContent={'flex-start'}>
                <TbLockBitcoin />
              </Flex>
            ) : (
              leftAccessory && (
                <Flex alignItems={'flex-start'} justifyContent={'flex-start'}>
                  {leftAccessory}
                </Flex>
              )
            )
          }
          endElement={
            toolTipInfo ? (
              <>
                <BaseTooltip message={toolTipInfo}>
                  <HiOutlineInformationCircle size={18} />
                </BaseTooltip>
              </>
            ) : (
              rightAccessory && (
                <Flex alignItems={'flex-end'} justifyContent={'flex-end'}>
                  {rightAccessory}
                </Flex>
              )
            )
          }
        >
          <Input
            {...field}
            type={type}
            onBlur={(e) => {
              field?.onBlur(e)
            }}
            value={field?.value}
            placeholder={t(placeholder)}
            borderRadius={customRadius ?? '7px'}
            border={'1px solid'}
            borderColor={isError ? 'red.500' : 'bg.muted'}
            _focus={{ borderColor: 'primary.500' }}
            _placeholder={{ color: isError ? 'red.500' : 'gray.400' }}
            size={'lg'}
            variant={'outline'}
            bg={'bg.muted'}
            readOnly={isReadOnly}
            disabled={isDisabled}
            fontSize={{ base: '16px', md: '12px' }}
            height={height}
            autoCapitalize="none"
            accept={accept}
          />
        </InputGroup>
      )}

      {isError && (
        <Flex gap={1} mt={1} alignItems={'center'}>
          <Field.ErrorIcon width={4} height={4} color={'red.500'} />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Flex>
      )}
      {infoMessage && (
        <>
          {isLoading ? (
            <CustomSkeletonLoader type="TEXT" numberOfLines={2} />
          ) : (
            <Flex gap={1} mt={1} alignItems={'center'}>
              <Field.ErrorIcon width={4} height={4} color={'info.500'} />
              <Field.HelperText p={1}>{t(infoMessage)}</Field.HelperText>
            </Flex>
          )}
        </>
      )}
    </Field.Root>
  )
}

export default FormTextInput
