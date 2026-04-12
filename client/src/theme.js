import { createTheme } from '@mantine/core';

/** Mantine theme aligned with site CSS tokens (gold / teal on charcoal). */
export const appTheme = createTheme({
  fontFamily: 'Outfit, system-ui, sans-serif',
  headings: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontWeight: '500',
  },
  primaryColor: 'yellow',
  defaultRadius: 'md',
  defaultGradient: {
    from: '#cfae62',
    to: '#3ecfbc',
    deg: 125,
  },
  colors: {
    yellow: [
      '#fff9e6',
      '#f5ebc4',
      '#e8d598',
      '#dcc06f',
      '#cfae62',
      '#b89445',
      '#9a7a38',
      '#7c612c',
      '#5e4921',
      '#403217',
    ],
  },
});

export const inputSurfaceStyles = {
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(207, 174, 98, 0.28)',
    color: 'var(--color-text)',
    borderRadius: 'var(--radius-sm)',
  },
  label: { color: 'var(--color-text)', fontWeight: 500 },
  description: { color: 'var(--color-text-muted)' },
};
