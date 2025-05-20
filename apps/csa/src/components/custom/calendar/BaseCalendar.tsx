'use client'
import { Box } from '@chakra-ui/react'
import { DayPicker, DateRange, defaultLocale } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useCalendarStyles } from './styles/calendar-styles'
import { useColorModeValue } from '_components/ui/color-mode'
import { FC } from 'react'
import { format } from 'date-fns'
import { SwitchColorMode } from '../switch-color'

interface SingleProps {
  mode: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  blockedDates?: (
    | Date
    | {
        from: Date
        to: Date
      }
  )[]
}

interface RangeProps {
  mode: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  blockedDates?: (
    | Date
    | {
        from: Date
        to: Date
      }
  )[]
}

type CustomCalendarProps = SingleProps | RangeProps

export const BaseCalendar: FC<CustomCalendarProps> = (props) => {
  const calendarStyles = useCalendarStyles()
  const sharedProps = {
    weekStartsOn: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    showOutsideDays: false,
    numberOfMonths: props.mode === 'single' ? 1 : 2,
    navLayout: 'around' as const,
    modifiersClassNames: calendarStyles.modifiersClassNames,
    modifiersStyles: calendarStyles.modifiersStyles,
    styles: calendarStyles.styles,
  }

  const { mode, selected, onSelect } = props

  return (
    <Box width={'full'} p={4} borderRadius="xl" borderWidth="1px" boxShadow="lg" bg={useColorModeValue('white', 'gray.800')}>
      <SwitchColorMode />
      {mode === 'single' && (
        <DayPicker
          locale={defaultLocale}
          formatters={{
            formatCaption: (date, options) => format(date, 'MMMM yyyy', options),
          }}
          mode="single"
          selected={selected as Date}
          onSelect={onSelect as (date: Date | undefined) => void}
          modifiers={{ booked: props?.blockedDates }}
          {...sharedProps}
        />
      )}
      {mode === 'range' && (
        <DayPicker
          locale={defaultLocale}
          formatters={{
            formatCaption: (date, options) => format(date, 'MMMM yyyy', options),
          }}
          mode="range"
          selected={selected as DateRange}
          onSelect={onSelect as (range: DateRange | undefined) => void}
          {...sharedProps}
          modifiers={{ booked: props?.blockedDates }}
        />
      )}
    </Box>
  )
}
