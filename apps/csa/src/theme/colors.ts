type ColorShades = {
  [key: number]: { value: string }
}

export type Colors = {
  primary: ColorShades
  secondary: ColorShades
  blue: ColorShades
  red: ColorShades
  orange: ColorShades
  overlay: ColorShades
  neutral: ColorShades
  lighter: ColorShades
}

const colors: Colors = {
  primary: {
    50: { value: '#eff9ff' },
    100: { value: '#daf0ff' },
    200: { value: '#bee6ff' },
    300: { value: '#91d8ff' },
    400: { value: '#5ec0fc' },
    500: { value: '#38a2f9' },
    600: { value: '#2285ee' },
    700: { value: '#1a6edb' },
    800: { value: '#1c58b1' },
    900: { value: '#1c4c8c' },
    950: { value: '#0e1e36' },
  },

  secondary: {
    50: { value: '#f8f7ee' },
    100: { value: '#edecd4' },
    200: { value: '#dcd7ac' },
    300: { value: '#c8be7c' },
    400: { value: '#b7a658' },
    500: { value: '#a8934a' },
    600: { value: '#90773e' },
    700: { value: '#715933' },
    800: { value: '#624c31' },
    900: { value: '#55412e' },
    950: { value: '#302318' },
  },
  red: {
    500: { value: '#ec2f4e' },
  },
  neutral: {
    500: { value: '#ffffff' },
  },
  lighter: {
    500: { value: '#C7C7D2' },
  },
  orange: {
    500: { value: '#f97316' },
  },
  blue: { 500: { value: '#3b82f6' } },
  overlay: {
    500: { value: '#000000' },
  },
}

const getColor = (color: keyof Colors = 'primary', opacity: number = 500) => colors[color]?.[opacity]?.value

/**
 * Get the color with the specified opacity.
 * The color in the theme.
 * The opacity value (0 to 100).
 * @returns The RGBA color string with the specified opacity.
 */
const hexToRGB = (color: keyof Colors, alpha?: number, op?: number) => {
  const hex = getColor(color, op)
  const r = parseInt(hex?.slice(1, 3), 16)
  const g = parseInt(hex?.slice(3, 5), 16)
  const b = parseInt(hex?.slice(5, 7), 16)

  return `rgba(${r},${g},${b}${alpha ? `, ${alpha}` : ''})`
}

export { colors, hexToRGB, getColor }
