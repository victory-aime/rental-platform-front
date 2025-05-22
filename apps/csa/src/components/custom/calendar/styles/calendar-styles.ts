import { useColorModeValue } from '_components/ui/color-mode'
import { VariablesColors } from '_theme/variables'
import { DateRange, UI } from 'react-day-picker'

export const useCalendarStyles = (isSelected: Date | DateRange, type: 'single' | 'range') => {
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
        borderRadius: type === 'single' ? '8px' : '8px 0 0 8px',
      },
      range_end: {
        backgroundColor: selectedBg,
        color: selectedColor,
        borderRadius: type === 'single' ? '8px' : '0 8px 8px 0',
      },
      range_middle: {
        backgroundColor: middleBg,
        color: middleColor,
        borderRadius: '0',
      },
      today: {
        fontWeight: 'bold',
        border: `${!isSelected ? `1px dashed ${selectedBg}` : 'none'}`,
      },
      booked: {
        backgroundColor: blockedBg,
        borderRadius: '0',
        color: 'white',
        cursor: 'not-allowed',
      },
      hovered: {
        backgroundColor: useColorModeValue('#e0f2fe', VariablesColors.blue), // bleu clair ou sombre
        color: useColorModeValue(VariablesColors.blue, VariablesColors.white),
        borderRadius: '8px',
        boxShadow: 'md',
      },
    },

    styles: {
      [UI.Day]: {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      },
      [UI.Weekday]: {
        fontSize: '14px',
        color: '#888',
        padding: '1rem',
      },
      [UI.Nav]: {
        marginBottom: '1rem',
      },
      [UI.Root]: {
        padding: '1rem',
        borderRadius: '12px',
        fontFamily: 'Lato, sans-serif',
      },
    },
  }
}
