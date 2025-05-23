import React, { useRef, useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import frLocale from '@fullcalendar/core/locales/fr'
import { HStack, Box, SegmentGroup, VStack, Flex, Popover, Portal } from '@chakra-ui/react'
import { BaseButton } from '../button'
import { BoxIcon } from '../boxIcon'
import { HiMiniChevronRight, HiMiniChevronLeft } from 'react-icons/hi2'
import { VariablesColors } from '_theme/variables'
import { Status } from '_components/ui/status'
import { LuGrid2X2, LuList, LuTable } from 'react-icons/lu'
import { BaseText, TextVariant, TextWeight } from '../base-text'
import { useColorMode } from '_components/ui/color-mode'
import { BaseAgendaProps } from './interface/agenda'
import { UTILS } from 'rental-platform-shared'

export const BaseAgenda = ({ events, initialView = 'dayGridMonth', onEventClick, onDateSelect, showLegend = true }: BaseAgendaProps) => {
  const { colorMode } = useColorMode()
  const [currentTitle, setCurrentTitle] = useState('')
  const [value, setValue] = useState<string | null>(initialView)
  const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null)

  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()

  useEffect(() => {
    if (calendarApi) {
      setCurrentTitle(calendarApi.view.title)
    }
  }, [calendarApi, value])

  // useEffect(() => {
  //   if (calendarApi) {
  //     const viewType = calendarApi.view.type
  //     const calendarEl = calendarApi.el

  //     if (calendarEl) {
  //       if (viewType === 'timeGridDay') {
  //         calendarEl.classList.add('fc-view-day')
  //       } else {
  //         calendarEl.classList.remove('fc-view-day')
  //       }
  //     }
  //   }
  // }, [value])

  const changeView = (viewName: string) => {
    const api = calendarRef.current?.getApi()
    api?.changeView(viewName)
    setCurrentTitle(api?.view.title ?? '')
  }

  const renderButtonsValue = [
    {
      value: 'dayGridMonth',
      label: (
        <HStack>
          <LuTable /> Mois
        </HStack>
      ),
    },
    {
      value: 'timeGridWeek',
      label: (
        <HStack>
          <LuGrid2X2 /> Semaine
        </HStack>
      ),
    },
    {
      value: 'timeGridDay',
      label: (
        <HStack>
          <LuList /> Jour
        </HStack>
      ),
    },
    {
      value: 'multiMonthYear',
      label: (
        <HStack>
          <LuGrid2X2 /> Grille de mois
        </HStack>
      ),
    },
  ]

  const renderEventContent = (eventInfo: any) => {
    const handleClick = (e: any) => {
      const isSame = openedPopoverId === eventInfo.event.id
      setOpenedPopoverId(isSame ? null : eventInfo.event.id)
    }

    return (
      <Popover.Root open={openedPopoverId === eventInfo.event.id} ids={{ trigger: eventInfo.event.id }} closeOnEscape closeOnInteractOutside>
        <Popover.Trigger asChild>
          <Box
            onClick={handleClick}
            px={2}
            py={1}
            bg={eventInfo.backgroundColor ?? 'gray.600'}
            color={eventInfo.textColor ?? 'white'}
            borderRadius="md"
            fontSize="xs"
            fontWeight="semibold"
            cursor="pointer"
          >
            {eventInfo.event.title}
          </Box>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width={'fit-content'} padding={8}>
              <VStack align="start" gap={2}>
                <BaseText variant={TextVariant.M} weight={TextWeight.Bold}>
                  {eventInfo.event.title}
                </BaseText>
                <BaseText fontSize="sm">Début : {UTILS.formatDisplayDate(eventInfo.event.start)}</BaseText>
                <BaseText fontSize="sm">Fin : {UTILS.formatDisplayDate(eventInfo.event.end)}</BaseText>
              </VStack>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    )
  }

  return (
    <Box width={'full'} className={`${colorMode === 'dark' ? 'calendar-dark' : 'calendar-light'}`}>
      <VStack gap={8} mb={50} alignItems={'flex-start'} width={'full'}>
        <HStack width={'full'} justify="space-between" align="center">
          <HStack gap={5}>
            <BaseButton
              borderRadius={'full'}
              onClick={() => calendarApi?.today()}
              padding={6}
              bg={'none'}
              borderWidth={1}
              borderColor={'gray.100'}
              color={colorMode === 'dark' ? 'white' : 'black'}
              _hover={{ backgroundColor: colorMode === 'dark' ? 'gray.800' : 'gray.50' }}
            >
              Aujourd'hui
            </BaseButton>
            <Flex gap={3}>
              <BoxIcon
                color={'none'}
                borderRadius={'full'}
                boxSize={'30px'}
                borderColor={colorMode === 'dark' ? 'white' : 'gray.100'}
                _hover={{ backgroundColor: colorMode === 'dark' ? 'gray.800' : 'gray.50' }}
                onClick={() => calendarApi?.prev()}
                cursor={'pointer'}
              >
                <HiMiniChevronLeft color={colorMode === 'dark' ? VariablesColors.white : VariablesColors.black} size={22} />
              </BoxIcon>
              <BoxIcon
                color={'none'}
                borderRadius={'full'}
                boxSize={'30px'}
                borderColor={colorMode === 'dark' ? 'white' : 'gray.100'}
                _hover={{ backgroundColor: colorMode === 'dark' ? 'gray.800' : 'gray.50' }}
                onClick={() => calendarApi?.next()}
                cursor={'pointer'}
              >
                <HiMiniChevronRight color={colorMode === 'dark' ? VariablesColors.white : VariablesColors.black} size={22} />
              </BoxIcon>
            </Flex>
          </HStack>
          <BaseText variant={TextVariant.L} weight={TextWeight.Bold} textTransform={'capitalize'}>
            {currentTitle}
          </BaseText>
          <SegmentGroup.Root
            value={value}
            onValueChange={(e) => {
              setValue(e.value)
              changeView(e.value ?? '')
            }}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={renderButtonsValue} />
          </SegmentGroup.Root>
        </HStack>

        {showLegend && (
          <HStack gap={8}>
            <Status value={'info'} size={'lg'}>
              New Reservations
            </Status>
            <Status value={'warning'} size={'lg'}>
              Maintenance
            </Status>
            <Status value={'error'} size={'lg'}>
              Car unavailable
            </Status>
            <Status value={'success'} size={'lg'}>
              Reservation success
            </Status>
          </HStack>
        )}
      </VStack>

      <FullCalendar
        locales={[frLocale]}
        locale="fr"
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        headerToolbar={false}
        initialView={initialView}
        editable={false}
        selectable={false}
        dragScroll={false}
        eventStartEditable={false}
        eventDurationEditable={false}
        allDaySlot={false}
        events={events}
        select={onDateSelect}
        eventClick={onEventClick}
        eventContent={renderEventContent}
      />
    </Box>
  )
}
