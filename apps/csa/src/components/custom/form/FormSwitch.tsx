import { Fieldset, Switch, Box, Flex } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { FC } from 'react'
import { SwitchProps } from './interface/input'
import { useTranslation } from 'react-i18next'
import { BaseText, TextVariant } from '../base-text'
import { CustomSkeletonLoader } from '../custom-skeleton'

export const FormSwitch: FC<SwitchProps> = ({ name, validate, label = '', description = '', isLoading }) => {
  const { t } = useTranslation()
  const fieldHookConfig = {
    name,
    validate,
  }
  const [field, { touched, error }, helpers] = useField(fieldHookConfig)
  const isError = error ? Boolean(error) : touched && Boolean(error)

  const { setValue } = helpers

  const handleCheckedChange = (details: { checked: boolean }) => {
    setValue(details.checked)
  }

  return (
    <Fieldset.Root id={name} invalid={isError} width={'fit-content'} mb={4}>
      <Switch.Root name={name} checked={field.value} onCheckedChange={handleCheckedChange} colorPalette={'green'} size={'md'}>
        <Flex gap={2} alignItems={'flex-start'} justifyContent={'flex-start'}>
          {isLoading ? (
            <CustomSkeletonLoader type="IMAGE" height={'25px'} />
          ) : (
            <>
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </>
          )}

          {isLoading ? (
            <CustomSkeletonLoader type="TEXT" numberOfLines={2} />
          ) : (
            <Box>
              <BaseText variant={TextVariant.S}>{t(label)}</BaseText>
              <BaseText variant={TextVariant.XS} color={'gray.500'}>
                {t(description)}
              </BaseText>
            </Box>
          )}
        </Flex>
      </Switch.Root>
      {isError && <Fieldset.ErrorText>{'error'}</Fieldset.ErrorText>}
    </Fieldset.Root>
  )
}
