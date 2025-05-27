import tinycolor from 'tinycolor2'

export const generateDynamicColorShades = (baseHex: string) => {
  const base = tinycolor(baseHex)
  return {
    50: { value: base.clone().lighten(45).toHexString() },
    100: { value: base.clone().lighten(35).toHexString() },
    200: { value: base.clone().lighten(25).toHexString() },
    300: { value: base.clone().lighten(15).toHexString() },
    400: { value: base.clone().lighten(5).toHexString() },
    500: { value: base.toHexString() },
    600: { value: base.clone().darken(5).toHexString() },
    700: { value: base.clone().darken(10).toHexString() },
    800: { value: base.clone().darken(15).toHexString() },
    900: { value: base.clone().darken(20).toHexString() },
  }
}
