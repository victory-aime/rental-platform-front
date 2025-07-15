'use client'
import { Input, InputGroup, Popover, Field, Portal, Flex } from '@chakra-ui/react'
import { useField } from 'formik'
import { BaseCalendar } from '../calendar/BaseCalendar'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useId, useState } from 'react'
import { PiCalendarThin } from 'react-icons/pi'
import { BoxIcon } from '../boxIcon'
import { IoIosClose } from 'react-icons/io'
import { FormDatePickerFieldProps } from './interface/input'
import { BaseText } from '../base-text'
import { useTranslation } from 'react-i18next'
import { COMMON_FORMAT_DATE } from 'rise-core-frontend'

export const FormDatePicker = ({ name, label, mode, placeholder = '', isReadOnly, isDisabled, required }: FormDatePickerFieldProps) => {
  const id = useId()
  const { t } = useTranslation()
  const [field, { touched, error }, helpers] = useField(name)
  const isError = isReadOnly ? Boolean(error) : !!(touched && Boolean(error))
  const [open, setOpen] = useState(false)

  const handleChange = (value: Date | DateRange | Date[] | undefined) => {
    helpers.setValue(value)

    if (mode === 'single') {
      setOpen(false)
    }

    if (mode === 'range') {
      const range = value as DateRange
      const { from, to } = range || {}

      if (from && to && from.getTime() !== to.getTime()) {
        setOpen(false)
      }
    }
  }

  const handleReset = () => {
    helpers.setValue(undefined)
    helpers.setTouched(true)
  }

  const getDisplayValue = (): string => {
    const value = field.value
    if (!value) return ''

    if (mode === 'single' && value instanceof Date) {
      return format(value, COMMON_FORMAT_DATE)
    }

    if (mode === 'range') {
      const { from, to } = value as DateRange
      if (!from) return ''
      if (!to || from.getTime() === to.getTime()) {
        return `Du ${format(from, COMMON_FORMAT_DATE)}`
      }
      return `Du ${format(from, COMMON_FORMAT_DATE)} au ${format(to, COMMON_FORMAT_DATE)}`
    }

    return ''
  }

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label display={'flex'} gap={'6px'} fontSize={{ base: '14px', md: '16px' }}>
          {t(label)}
          {required && <BaseText color={'red'}> * </BaseText>}
        </Field.Label>
      )}
      <Popover.Root open={open} portalled={true} ids={{ trigger: id }} onPointerDownOutside={(e) => e.stopPropagation()} onInteractOutside={(e) => e.stopPropagation()} closeOnInteractOutside={false}>
        <Popover.Trigger asChild>
          <InputGroup
            flex={1}
            width={'full'}
            onClick={() => setOpen(true)}
            endElement={
              !!field.value && !isReadOnly && !isDisabled ? (
                <BoxIcon
                  color={'red'}
                  borderRadius={'full'}
                  boxSize={'20px'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleReset()
                  }}
                >
                  <IoIosClose size={14} />
                </BoxIcon>
              ) : (
                <Flex alignItems="center" justifyContent="center" mt="5px">
                  <PiCalendarThin />
                </Flex>
              )
            }
          >
            <Input
              {...field}
              onBlur={(e) => field?.onBlur(e)}
              value={getDisplayValue()}
              placeholder={t(placeholder)}
              borderRadius={'7px'}
              border={'1px solid'}
              borderColor={isError ? 'red.500' : 'bg.muted'}
              _focus={{ borderColor: 'primary.500' }}
              _placeholder={{ color: isError ? 'red.500' : 'gray.400' }}
              size={'lg'}
              pl={3}
              mt={'5px'}
              variant={'outline'}
              bg={'bg.muted'}
              readOnly
              disabled={isDisabled}
              fontSize={'16px'}
              height={'50px'}
              autoCapitalize="none"
            />
          </InputGroup>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width={'fit-content'}>
              <BaseCalendar mode={mode} selected={field.value} onSelect={handleChange} onCloseButton={() => setOpen(false)} />
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
      {isError && (
        <Flex gap={1} mt={1} alignItems={'center'}>
          <Field.ErrorIcon width={4} height={4} color={'red.500'} />
          <Field.ErrorText>{typeof error === 'string' ? error : typeof error === 'object' ? Object.values(error).join(' | ') : null}</Field.ErrorText>
        </Flex>
      )}
    </Field.Root>
  )
}
