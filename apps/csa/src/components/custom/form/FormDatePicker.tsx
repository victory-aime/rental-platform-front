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
import { UTILS } from 'rental-platform-shared'
import { FormDatePickerFieldProps } from './interface/input'

export const FormDatePicker = ({ name, label, mode, placeholder, isReadOnly, isDisabled }: FormDatePickerFieldProps) => {
  const id = useId()
  const [field, meta, helpers] = useField(name)
  const isError = isReadOnly ? !!meta.error : !!(meta.touched && meta.error)
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
      return format(value, UTILS.COMMON_FORMAT_DATE)
    }

    if (mode === 'range') {
      const { from, to } = value as DateRange
      if (!from) return ''
      if (!to || from.getTime() === to.getTime()) {
        return `Du ${format(from, UTILS.COMMON_FORMAT_DATE)}`
      }
      return `Du ${format(from, UTILS.COMMON_FORMAT_DATE)} au ${format(to, UTILS.COMMON_FORMAT_DATE)}`
    }

    return ''
  }

  return (
    <Field.Root id={name} invalid={isError}>
      {label && <Field.Label>{label}</Field.Label>}
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
              placeholder={placeholder}
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
      {isError && <Field.ErrorText>{meta?.error}</Field.ErrorText>}
    </Field.Root>
  )
}
