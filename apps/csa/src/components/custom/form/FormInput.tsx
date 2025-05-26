import React, { useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { Input, Text, Field, Flex } from '@chakra-ui/react'
import { TextInputProps } from './interface/input'
import { InputGroup } from '_components/ui/input-group'
import { TbLockBitcoin } from 'react-icons/tb'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BaseTooltip } from '_components/custom'
import { RiEyeOffLine, RiEyeLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

const FormTextInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  localErrorMsg = '',
  required = false,
  isReadOnly = false,
  isDisabled = false,
  rightAccessory,
  leftAccessory,
  customRadius,
  accept,
  height,
  validate,
  onChangeFunction,
  toolTipInfo,
}: TextInputProps) => {
  const { t } = useTranslation()
  const fieldHookConfig = {
    name,
    validate,
  }
  const [field, { touched, error }] = useField(fieldHookConfig)
  const isError = isReadOnly ? Boolean(error) : !!(touched && Boolean(error))
  const isPassword = type === 'password'
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword)

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label display={'flex'} gap={'6px'} fontSize={{ base: '14px', md: '16px' }}>
          {t(label)}
          {required && <Text color={'red'}> * </Text>}
        </Field.Label>
      )}

      <InputGroup
        flex={1}
        width={'full'}
        startElement={
          isPassword ? (
            <Flex mt={'5px'} pl={'10px'} alignItems={'center'} justifyContent={'center'}>
              <TbLockBitcoin />
            </Flex>
          ) : (
            leftAccessory && (
              <Flex mt={'5px'} pr={'10px'} boxSize={'30px'} alignItems={'center'} justifyContent={'center'}>
                {leftAccessory}
              </Flex>
            )
          )
        }
        endElement={
          isPassword ? (
            <Flex mt={'5px'} pr={'10px'} alignItems={'center'} justifyContent={'center'} onClick={() => setSecureTextEntry(!secureTextEntry)}>
              {secureTextEntry ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
            </Flex>
          ) : toolTipInfo ? (
            <>
              <BaseTooltip message={toolTipInfo}>
                <HiOutlineInformationCircle size={18} />
              </BaseTooltip>
            </>
          ) : (
            rightAccessory && (
              <Flex mt={'5px'} pr={'10px'} boxSize={'30px'} alignItems={'center'} justifyContent={'center'}>
                {rightAccessory}
              </Flex>
            )
          )
        }
      >
        <Input
          {...field}
          type={isPassword ? (secureTextEntry ? 'password' : 'text') : type}
          onBlur={(e) => {
            field?.onBlur(e)
          }}
          value={field?.value ?? ''}
          placeholder={t(placeholder)}
          borderRadius={customRadius ?? '7px'}
          border={'1px solid'}
          borderColor={isError ? 'red.500' : 'bg.muted'}
          _focus={{ borderColor: 'primary.500' }}
          _placeholder={{ color: isError ? 'red.500' : 'gray.400' }}
          size={'lg'}
          pl={3}
          mt={'5px'}
          variant={'outline'}
          bg={'bg.muted'}
          readOnly={isReadOnly}
          disabled={isDisabled}
          fontSize={'16px'}
          height={height ?? '50px'}
          autoCapitalize="none"
          accept={accept}
        />
      </InputGroup>

      {isError && (
        <Flex gap={1} mt={1} alignItems={'center'}>
          <Field.ErrorIcon width={4} height={4} color={'red.500'} />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Flex>
      )}
      {localErrorMsg && <Field.HelperText p={1}>{localErrorMsg}</Field.HelperText>}
    </Field.Root>
  )
}

export default FormTextInput
