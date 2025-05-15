import { Fieldset, Switch } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { FC } from 'react'
import { SwitchProps } from './interface/input'

export const FormSwitch: FC<SwitchProps> = ({ name, validate, label }) => {
  const fieldHookConfig = {
    name,
    validate,
  }
  const [field, { touched, error }, helpers] = useField(fieldHookConfig)
  const isError = !!(touched && error)
  const { setValue } = helpers

  const handleCheckedChange = (details: { checked: boolean }) => {
    setValue(details.checked)
  }

  return (
    <Fieldset.Root id={name} invalid={isError} width={'fit-content'} alignItems={'center'}>
      <Switch.Root name={name} checked={field.value} onCheckedChange={handleCheckedChange} colorPalette={'green'} size={'lg'}>
        <Switch.Label>{label}</Switch.Label>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
      {isError && <Fieldset.ErrorText>{'error'}</Fieldset.ErrorText>}
    </Fieldset.Root>
  )
}
