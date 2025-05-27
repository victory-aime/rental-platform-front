import { useThemeColor } from '_context/themeColor-context'
import { DateRange, UI } from 'react-day-picker'

export const useCalendarStyles = (isSelected: Date | DateRange, type: 'single' | 'range') => {
  const { primaryColor } = useThemeColor() // couleur dynamique de l'utilisateur

  const selectedBg = primaryColor
  const selectedColor = '#ffffff' // ou autre
  const middleBg = '#dbeafe' // tu peux aussi le rendre dynamique si besoin
  const middleColor = '#000000'
  const blockedBg = '#ec2f4e' // idem

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
        border: !isSelected ? `1px dashed ${selectedBg}` : 'none',
      },
      booked: {
        backgroundColor: blockedBg,
        borderRadius: '0',
        color: 'white',
        cursor: 'not-allowed',
      },
      hovered: {
        backgroundColor: `${primaryColor}33`, // exemple avec opacité hex 20%
        color: selectedColor,
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
