'use client'

import { Box, Button, Text } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import { ModalComponent } from '../modal'

interface CalendarEvent {
  title: string
  start: string
  end?: string
}

export default function ReservationCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr)
    setOpen(true)
  }

  const handleAddEvent = () => {
    if (selectedDate) {
      setEvents((prev) => [...prev, { title: 'Nouvelle réservation', start: selectedDate }])
    }
    setOpen(!open)
  }

  return (
    <Box p={4}>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="timeGridWeek" events={events} dateClick={handleDateClick} height="auto" />
      <ModalComponent title="Creer une reservation" open={open} onChange={() => setOpen(!open)}>
        <Text>Créer une réservation le {selectedDate}</Text>
        <Button mt={4} colorScheme="blue" onClick={handleAddEvent}>
          Confirmer
        </Button>
      </ModalComponent>
    </Box>
  )
}
