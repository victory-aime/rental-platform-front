'use client'
import { Input, InputGroup, Popover, Field, Portal, Flex } from '@chakra-ui/react'
import { useField } from 'formik'
import { BaseCalendar } from '../calendar/BaseCalendar'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import { PiCalendarThin } from 'react-icons/pi'

interface BaseFieldProps {
  name: string
  label?: string
  mode: 'single' | 'range'
  placeholder?: string
  isReadOnly?: boolean
  isDisabled?: boolean
}

export const FormDatePicker = ({ name, label, mode, placeholder, isReadOnly, isDisabled }: BaseFieldProps) => {
  const [field, meta, helpers] = useField(name)
  const isError = isReadOnly ? !!meta.error : !!(meta.touched && meta.error)
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleChange = (value: Date | DateRange | Date[] | undefined) => {
    helpers.setValue(value)

    if (mode === 'single') {
      setOpen(false)
    }

    if (mode === 'range') {
      const range = value as DateRange
      if (range?.from && range?.to) {
        setOpen(false)
      }
    }
  }

  const getDisplayValue = (): string => {
    const value = field.value
    if (!value) return ''

    if (mode === 'single' && value instanceof Date) {
      return format(value, 'dd/MM/yyyy')
    }

    if (mode === 'range') {
      const { from, to } = value as DateRange
      if (!from) return ''
      if (!to) return `Du ${format(from, 'dd/MM/yyyy')} au ...`
      return `Du ${format(from, 'dd/MM/yyyy')} au ${format(to, 'dd/MM/yyyy')}`
    }

    return ''
  }

  return (
    <Field.Root id={name} invalid={isError}>
      {label && <Field.Label>{label}</Field.Label>}
      <Popover.Root open={open}>
        <Popover.Trigger asChild>
          <InputGroup
            flex={1}
            width={'full'}
            onClick={() => setOpen(true)}
            endElement={
              <Flex mt={'5px'} pl={'10px'} alignItems={'center'} justifyContent={'center'}>
                <PiCalendarThin />
              </Flex>
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
            <Popover.Content
              width={'fit-content'}
              ref={popoverRef}
              onPointerDownOutside={(e) => {
                const range = field.value as DateRange
                if (mode === 'range' && (!range?.from || !range?.to)) {
                  e.preventDefault()
                } else {
                  setOpen(false)
                }
              }}
            >
              <Popover.Arrow />
              <BaseCalendar mode={mode} selected={field.value} onSelect={handleChange} />
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
      {isError && <Field.ErrorText>{meta?.error}</Field.ErrorText>}
    </Field.Root>
  )
}
