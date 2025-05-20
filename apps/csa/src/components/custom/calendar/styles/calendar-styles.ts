import { useColorModeValue } from '_components/ui/color-mode'
import { VariablesColors } from '_theme/variables'
import { UI } from 'react-day-picker'

export const useCalendarStyles = () => {
  const selectedBg = useColorModeValue('#2563eb', '#60a5fa')
  const selectedColor = useColorModeValue('white', 'gray.900')
  const middleBg = useColorModeValue('#dbeafe', '#1e3a8a')
  const middleColor = useColorModeValue('black', 'white')
  const blockedBg = useColorModeValue('#FF2C00', VariablesColors.red)

  return {
    modifiersClassNames: {
      selected: 'selected',
      today: 'today',
      range_start: 'range-start',
      range_end: 'range-end',
      range_middle: 'range-middle',
    },
    modifiersStyles: {
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
        border: `1px dashed ${selectedBg}`,
      },
      booked: {
        backgroundColor: blockedBg,
        borderRadius: '0',
        color: 'white',
        cursor: 'not-allowed',
      },
    },
    styles: {
      [UI.Day]: {
        width: '70px',
        height: '70px',
        borderRadius: '8px',
        fontSize: '14px',
        margin: '8px',
        cursor: 'pointer',
        textAlign: 'center' as const,
        alignItems: 'center',
        justifyContent: 'center',
      },
      [UI.Weekday]: {
        fontSize: '13px',
        color: '#888',
        textAlign: 'center' as const,
        padding: '1rem',
      },
      [UI.Nav]: {
        marginBottom: '1rem',
        color: 'yellow',
      },
      [UI.Root]: {
        padding: '1rem',
        borderRadius: '12px',
        fontFamily: 'Lato, sans-serif',
      },
    },
  }
}
