'use client'
import { Box, Text } from '@chakra-ui/react'
import { useColorModeValue } from '_components/ui/color-mode'
import { useState } from 'react'
import { DayPicker, DateRange, UI, defaultLocale } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { SwitchColorMode } from '../switch-color'

export const CustomCalendar = () => {
  const [range, setRange] = useState<DateRange | undefined>()

  const selectedBg = useColorModeValue('#2563eb', '#60a5fa')
  const selectedColor = useColorModeValue('white', 'gray.900')
  const middleBg = useColorModeValue('#dbeafe', '#1e3a8a')
  const middleColor = useColorModeValue('black', 'white')
  const bookedBg = useColorModeValue('#fecaca', '#7f1d1d') // rouge clair ou sombre

  const bookedDates = [new Date(2025, 5, 8), new Date(2025, 5, 9), new Date(2025, 5, 10), { from: new Date(2025, 5, 15), to: new Date(2025, 5, 20) }]

  return (
    <Box p={4} borderRadius="xl" borderWidth="1px" boxShadow="lg" bg={useColorModeValue('white', 'gray.800')}>
      <SwitchColorMode />
      <DayPicker
        locale={defaultLocale}
        weekStartsOn={1}
        formatters={{
          formatCaption: (date, options) => format(date, 'MMMM yyyy', options),
        }}
        mode="range"
        selected={range}
        onSelect={setRange}
        showOutsideDays
        numberOfMonths={2}
        navLayout="around"
        animate
        modifiers={{ booked: bookedDates }}
        onDayClick={(date, modifiers) => {
          if (modifiers.booked) {
            alert('Cette date est déjà réservée.')
          }
        }}
        modifiersClassNames={{
          selected: 'selected',
          today: 'today',
          range_start: 'range-start',
          range_end: 'range-end',
          range_middle: 'range-middle',
          booked: 'booked',
        }}
        modifiersStyles={{
          selected: {
            backgroundColor: selectedBg,
            color: selectedColor,
          },
          range_start: {
            backgroundColor: selectedBg,
            color: selectedColor,
            borderRadius: '8px 0 0 8px',
          },
          range_end: {
            backgroundColor: selectedBg,
            color: selectedColor,
            borderRadius: '0 8px 8px 0',
          },
          range_middle: {
            backgroundColor: middleBg,
            color: middleColor,
          },
          today: {
            fontWeight: 'bold',
            border: `${!range ? `1px dashed ${selectedBg}` : 'none'}`,
          },
          booked: {
            backgroundColor: bookedBg,
            color: 'white',
            cursor: 'not-allowed',
          },
        }}
        styles={{
          [UI.Root]: {
            padding: '1rem',
            borderRadius: '12px',
            fontFamily: 'Lato, sans-serif',
          },
          [UI.Nav]: {
            marginBottom: '1rem',
          },
          [UI.Day]: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '70px',
            borderRadius: '8px',
            fontSize: '14px',
            margin: '8px',
            cursor: 'pointer',
            textAlign: 'center',
          },
          [UI.Weekday]: {
            fontSize: '13px',
            color: '#888',
            textAlign: 'center',
          },
        }}
      />
      {range?.from && range?.to && (
        <Text mt={3} textAlign="center" fontSize="sm" color="gray.500">
          Du {range.from.toLocaleDateString()} au {range.to.toLocaleDateString()}
        </Text>
      )}
    </Box>
  )
}
