type ColorShades = {
  [key: number]: { value: string }
}

export type Colors = {
  primary: ColorShades
  secondary: ColorShades
  tertiary: ColorShades
  blue: ColorShades
  red: ColorShades
  orange: ColorShades
  overlay: ColorShades
  neutral: ColorShades
  lighter: ColorShades
  danger: ColorShades
  success: ColorShades
  warning: ColorShades
  info: ColorShades
  error: ColorShades
}

const colors: Colors = {
  primary: {
    50: { value: '#9bf4eb' },
    100: { value: '#7cebe0' },
    200: { value: '#5fe0d4' },
    300: { value: '#44d3c5' },
    400: { value: '#30a99d' },
    500: { value: '#2ec4b6' },
    600: { value: '#309087' },
    700: { value: '#2f7a72' },
    800: { value: '#2d645f' },
    900: { value: '#29514d' },
  },

  secondary: {
    50: { value: '#f2e7ff' },
    100: { value: '#d9bfff' },
    200: { value: '#c199ff' },
    300: { value: '#a973fc' },
    400: { value: '#9050e3' },
    500: { value: '#783dc2' },
    600: { value: '#5f2e9b' },
    700: { value: '#482278' },
    800: { value: '#331758' },
    900: { value: '#210e3a' },
  },

  tertiary: {
    50: { value: '#ffe2b9' },
    100: { value: '#ffd191' },
    200: { value: '#ffc169' },
    300: { value: '#ffb041' },
    400: { value: '#FF9F1C' },
    500: { value: '#FF9F1C' },
    600: { value: '#db860e' },
    700: { value: '#bf7713' },
    800: { value: '#a46916' },
    900: { value: '#8a5b18' },
  },
  danger: {
    50: { value: '#ffe5e9' },
    100: { value: '#fab8c5' },
    200: { value: '#f6899f' },
    300: { value: '#f15a78' },
    400: { value: '#ec2f4e' },
    500: { value: '#d11b38' },
    600: { value: '#ae162f' },
    700: { value: '#8c1126' },
    800: { value: '#6a0c1d' },
    900: { value: '#4a0715' },
  },
  success: {
    50: { value: '#d2f8f3' },
    100: { value: '#a5efe7' },
    200: { value: '#78e6db' },
    300: { value: '#4bddcf' },
    400: { value: '#1fd3c3' },
    500: { value: '#17b5a8' },
    600: { value: '#139386' },
    700: { value: '#0f7266' },
    800: { value: '#0a5146' },
    900: { value: '#063128' },
  },

  warning: {
    50: { value: '#fff8e1' },
    100: { value: '#ffecb3' },
    200: { value: '#ffe082' },
    300: { value: '#ffd54f' },
    400: { value: '#ffca28' },
    500: { value: '#ffc107' },
    600: { value: '#ffb300' },
    700: { value: '#ffa000' },
    800: { value: '#ff8f00' },
    900: { value: '#ff6f00' },
  },

  info: {
    50: { value: '#e3f2fd' },
    100: { value: '#bbdefb' },
    200: { value: '#90caf9' },
    300: { value: '#64b5f6' },
    400: { value: '#42a5f5' },
    500: { value: '#2196f3' },
    600: { value: '#1e88e5' },
    700: { value: '#1976d2' },
    800: { value: '#1565c0' },
    900: { value: '#0d47a1' },
  },

  error: {
    50: { value: '#ffebee' },
    100: { value: '#ffcdd2' },
    200: { value: '#ef9a9a' },
    300: { value: '#e57373' },
    400: { value: '#ef5350' },
    500: { value: '#f44336' },
    600: { value: '#e53935' },
    700: { value: '#d32f2f' },
    800: { value: '#c62828' },
    900: { value: '#b71c1c' },
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

  blue: {
    500: { value: '#3b82f6' },
  },

  overlay: {
    500: { value: '#000000' },
  },
}

const getColor = (color: keyof Colors = 'primary', shade: number = 500): string => {
  return colors[color]?.[shade]?.value ?? '#000000'
}
/**
 * Get the color with the specified opacity.
 * The color in the theme.
 * The opacity value (0 to 100).
 * @returns The RGBA color string with the specified opacity.
 */
const hexToRGB = (color: keyof Colors, alpha: number = 1, shade: number = 500): string => {
  const hex = getColor(color, shade)
  if (!/^#[0-9A-F]{6}$/i.test(hex)) return `rgba(0,0,0,${alpha})`

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getGradient = (colorKey: keyof Colors, start: number = 400, mid: number = 500, end?: number): string => {
  const startColor = getColor(colorKey, start)
  const midColor = getColor(colorKey, mid)
  const endColor = end ? getColor(colorKey, end) : midColor
  return `linear-gradient(to right, ${startColor}, ${midColor}, ${endColor})`
}

const getHoverGradient = (colorKey: keyof Colors, end: number = 800, darker: number = 900, alpha: number = 1): string => {
  const endColor = hexToRGB(colorKey, alpha, end)
  const darkerColor = hexToRGB(colorKey, alpha, darker)
  return `linear-gradient(to right, ${endColor}, ${darkerColor})`
}

export { colors, hexToRGB, getColor, getGradient, getHoverGradient }
