'use client'
import { Box, Flex } from '@chakra-ui/react'
import { DayPicker, DateRange, defaultLocale } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useCalendarStyles } from './styles/calendar-styles'
import { useColorModeValue } from '_components/ui/color-mode'
import { FC, useState } from 'react'
import { format } from 'date-fns'
import { BoxIcon } from '../boxIcon'
import { IoIosClose } from 'react-icons/io'
import { COMMON_FORMAT_DATE_HEADER } from 'rise-core-frontend'

interface CommonProps {
  blockedDates?: (Date | { from: Date; to: Date })[]
  showToggleColor?: boolean
  onCloseButton?: () => void
}

interface SingleProps extends CommonProps {
  mode: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

interface RangeProps extends CommonProps {
  mode: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

type BaseCalendarProps = SingleProps | RangeProps

export const BaseCalendar: FC<BaseCalendarProps> = (props) => {
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>(undefined)
  const calendarStyles = useCalendarStyles(props.selected ?? (props.mode === 'single' ? new Date() : { from: new Date(), to: new Date() }), props.mode)
  const sharedProps = {
    weekStartsOn: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    showOutsideDays: false,
    animate: true,
    today: new Date(),
    numberOfMonths: props.mode === 'single' ? 1 : 2,
    navLayout: 'around' as const,
    modifiersClassNames: calendarStyles.modifiersClassNames,
    modifiersStyles: calendarStyles.modifiersStyles,
    styles: calendarStyles.styles,
  }
  const commonProps = {
    locale: defaultLocale,
    formatters: {
      formatCaption: (date: Date, options: any) => format(date, COMMON_FORMAT_DATE_HEADER, options),
    },
    modifiers: {
      booked: props.blockedDates,
      hovered: hoveredDay,
    },
    onDayMouseEnter: setHoveredDay,
    onDayMouseLeave: () => setHoveredDay(undefined),
    ...sharedProps,
  }

  const { mode, selected, onSelect, showToggleColor, onCloseButton } = props

  return (
    <Box width={'full'} p={4} borderRadius="xl" borderWidth="1px" boxShadow="lg" bg={useColorModeValue('white', 'gray.800')}>
      <Flex alignItems={'flex-end'} justifyContent={'flex-end'} width={'full'} padding={'0'}>
        {onCloseButton && (
          <BoxIcon color={'red'} onClick={onCloseButton} borderRadius={'50px'} boxSize={'25px'} cursor={'pointer'}>
            <IoIosClose size={24} />
          </BoxIcon>
        )}
      </Flex>

      {mode === 'single' && <DayPicker {...commonProps} mode={mode} selected={selected as Date} onSelect={onSelect as (date: any) => void} />}
      {mode === 'range' && <DayPicker {...commonProps} mode={mode} selected={selected as DateRange} onSelect={onSelect as (date: any) => void} />}
    </Box>
  )
}
