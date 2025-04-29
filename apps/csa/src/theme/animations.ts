export const keyframes = {
  // Fade Animation
  fade: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },

  // Dot Bounce Animation
  dotBounce: {
    "0%, '80%',100%": { transform: 'scale(1)' },
    '40%': { transform: 'scale(1.5)' },
  },

  // Bar Pulse Animation
  barPulse: {
    '0%': { transform: 'scaleY(1)' },
    '50%': { transform: 'scaleY(1.5)' },
    '100%': { transform: 'scaleY(1)' },
  },

  // Slide Left Animation
  slideLeft: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  // Slide Right Animation
  slideRight: {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },
}

export const animations = {
  fade: { value: 'fade 1s ease-in-out forwards' },
  dotBounce: { value: 'dotBounce 0.6s ease-in-out infinite' },
  barPulse: { value: 'barPulse 0.6s ease-in-out infinite' },
  slideLeft: { value: 'slideLeft 0.6s ease-in-out forwards' },
  slideRight: { value: 'slideRight 0.6s ease-in forwards' },
}
