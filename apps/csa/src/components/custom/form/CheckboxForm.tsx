import { CheckboxGroup, Fieldset, SimpleGrid } from '@chakra-ui/react'
import { Checkbox } from '_components/ui/checkbox'
import { useField } from 'formik'
import React, { FC } from 'react'
import { CheckBoxProps } from './interface/input'
import { NoDataFound } from '../no-data-found'

const CheckboxForm: FC<CheckBoxProps> = ({ name, validate, label, items, itemsPerRow }) => {
  const fieldHookConfig = { name, validate }
  const [field, { touched, error }, helpers] = useField(fieldHookConfig)
  const isError = error ? !!error : !!(touched && error)
  const { setValue } = helpers

  return (
    <Fieldset.Root id={name} invalid={isError}>
      {items && (
        <CheckboxGroup
          invalid={isError}
          name={field.name}
          value={field.value}
          onValueChange={(value: string[]) => {
            setValue(value)
          }}
        >
          <Fieldset.Content>
            {itemsPerRow ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lgOnly: itemsPerRow }} gap={8} width={'full'}>
                {items?.map((item, index) => (
                  <Checkbox key={index} value={item.name} size={'sm'}>
                    {item.name}
                  </Checkbox>
                ))}
              </SimpleGrid>
            ) : (
              <>
                {items?.map((item, index) => (
                  <Checkbox key={index} value={item.name} size={'sm'}>
                    {item.name}
                  </Checkbox>
                ))}
              </>
            )}
            {items?.length === 0 && <NoDataFound containerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }} />}
          </Fieldset.Content>
        </CheckboxGroup>
      )}

      {!items && label && (
        <Checkbox
          name={name}
          value={field.value}
          checked={field.value}
          size={'lg'}
          colorPalette={field?.value ? 'green' : isError ? 'red' : 'none'}
          onCheckedChange={({ checked }) => {
            setValue(checked)
          }}
          mb={4}
        >
          {label}
        </Checkbox>
      )}

      {isError && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}
    </Fieldset.Root>
  )
}

export default CheckboxForm
