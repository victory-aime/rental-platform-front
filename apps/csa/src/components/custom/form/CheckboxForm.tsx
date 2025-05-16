import { CheckboxGroup, Fieldset, SimpleGrid } from '@chakra-ui/react'
import { Checkbox } from '_components/ui/checkbox'
import { useField } from 'formik'
import React, { FC } from 'react'
import { CheckBoxProps } from './interface/input'

const CheckboxForm: FC<CheckBoxProps> = ({ name, validate, label, items, itemsPerRow }) => {
  const fieldHookConfig = { name, validate }
  const [field, { touched, error }, helpers] = useField(fieldHookConfig)
  const isError = !!(touched && error)
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
                  <Checkbox key={index} value={item.name} size={'lg'}>
                    {item.name}
                  </Checkbox>
                ))}
              </SimpleGrid>
            ) : (
              <>
                {items?.map((item, index) => (
                  <Checkbox key={index} value={item.name} size={'lg'}>
                    {item.name}
                  </Checkbox>
                ))}
              </>
            )}
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
