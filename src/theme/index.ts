import { extendTheme } from '@chakra-ui/react'
import { textStyles } from './textStyles'

const overrides = {
  colors: {
    purple: {
      300: '#9F94E8',
      500: '#5554D9',
      600: '#672AC8',
      900: '#2B247C',
    },
    blue: {
      200: '#AEC0F1',
      900: '#110C4E',
    },
    gray: {
      50: '#FAF8FF',
      200: '#E6E3EC',
    },
    while: {
      0: '#FFFFFF',
    },
    black: {
      900: '#000000',
    },
  },
  components: {},
  fonts: {
    // heading: "'Noto Sans JP','roboto', sans-serif",
    // body: "'Noto Sans JP','roboto', sans-serif",
    // mono: "'Noto Sans JP','roboto-Mono', monospace",
    heading: "'Noto Sans JP','Titillium Web', sans-serif",
    body: "'Noto Sans JP','Titillium Web', sans-serif",
    mono: "'Noto Sans JP','roboto-Mono', monospace",
  },
  fontSizes: {
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.375rem',
    '5xl': '2.75rem',
    '6xl': '3.25rem',
    '7xl': '4rem',
  },
  shadows: {},
  styles: {
    global: () => ({
      '*': {
        boxSizing: 'border-box',
        scrollBehavior: 'smooth',
        scrollMarginTop: '5rem',
        padding: 0,
        margin: 0,
      },
      body: {
        transition: 'background 200ms linear !important',
        bg: 'bg',
        color: 'text',
        display: 'flex',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '48rem',
        minHeight: '100vh',
      },
      ol: {
        listStyleType: 'decimal',
      },
      li: {
        margin: '0.75rem 0 0 1rem',
        listStylePosition: 'inside',
        p: {
          display: 'inline',
        },
      },
      table: {
        border: '1px solid #555',
      },
      tr: {
        border: '1px solid #555',
      },
      td: {
        border: '1px solid #555',
      },
      th: {
        border: '1px solid #555',
      },
    }),
  },
  textStyles,
  semanticTokens: {
    colors: {
      a: { _light: 'black.900', _dark: 'white.0' }, // text
      b: { _light: 'purple.600', _dark: 'blue.200' },
      c: { _light: 'purple.500', _dark: 'purple.300' },
      d: { _light: 'purple.300', _dark: 'purple.500' },
      e: { _light: 'blue.200', _dark: 'purple.600' },
      f: { _light: 'gray.200', _dark: 'purple.900' }, // background
      g: { _light: 'gray.50', _dark: 'purple.900' }, // background
      mode: { _light: 'gray.50', _dark: 'blue.900' },

      text: 'a',
      secondary: 'b',
      primary: 'c',
      highlight: 'd',
      bg: 'g',

      border: 'a',
      header: 'c',
      error: { _light: 'red.500', _dark: 'red.300' },
    },
  },
}

export default extendTheme(overrides)
export * from './config'
