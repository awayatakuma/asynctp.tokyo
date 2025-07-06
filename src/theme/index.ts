import { extendTheme } from '@chakra-ui/react'
import { textStyles } from './textStyles'

const overrides = {
  colors: {
    purple: {
      200: '#C4B5FD', // 追加 - ダークモード用
      300: '#9F94E8',
      400: '#A78BFA', // 追加 - ダークモード用
      500: '#5554D9',
      600: '#672AC8',
      900: '#2B247C',
    },
    blue: {
      200: '#AEC0F1',
      300: '#93C5FD', // 追加 - ダークモード用
      900: '#110C4E',
    },
    gray: {
      50: '#FAF8FF',
      100: '#F7FAFC', // 追加 - ダークモード用テキスト
      200: '#E6E3EC',
      600: '#718096', // 追加 - ダークモード用ボーダー
      800: '#2D3748', // 追加 - ダークモード用背景
      900: '#1A202C', // 追加 - ダークモード用背景
    },
    white: {
      // 修正: "while" → "white"
      0: '#FFFFFF',
    },
    black: {
      900: '#000000',
    },
  },
  components: {},
  fonts: {
    heading: "'Titillium Web', 'Noto Sans JP', sans-serif",
    body: "'Titillium Web', 'Noto Sans JP', sans-serif",
    mono: "'Noto Sans JP','ubuntu-Mono', 'Titillium Web'",
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
      pre: {
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        overflowX: 'scroll',
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
        '&:last-child': {
          marginBottom: '0.75rem',
        },
      },
      td: {
        border: '1px solid',
        borderColor: { _light: '#999', _dark: 'gray.600' },
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: '8px',
      },
      th: {
        border: '1px solid',
        borderColor: { _light: '#999', _dark: 'gray.600' },
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: '8px',
        backgroundColor: { _light: '#eee', _dark: 'gray.700' },
      },
      blockquote: {
        margin: '20px 0',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontStyle: 'italic',
        position: 'relative',
        backgroundColor: { _light: '#f1f3f5', _dark: 'gray.800' },
        color: { _light: '#495057', _dark: 'gray.300' },
        p: {
          margin: 0,
          lineHeight: 1.6,
        },
        '&::after': {
          content: '""',
          display: 'block',
          width: '50px',
          height: '2px',
          backgroundColor: 'primary',
          marginTop: '15px',
        },
        cite: {
          display: 'block',
          marginTop: '10px',
          fontSize: '0.9em',
          color: { _light: '#868e96', _dark: 'gray.400' },
          fontStyle: 'normal',
        },
      },
    }),
  },
  textStyles,
  semanticTokens: {
    colors: {
      // ダークモードでの可読性を大幅改善
      a: { _light: 'black.900', _dark: 'gray.100' }, // text - より明るく
      b: { _light: 'purple.600', _dark: 'purple.200' }, // secondary - より明るく
      c: { _light: 'purple.500', _dark: 'purple.300' }, // primary - コントラスト改善
      d: { _light: 'purple.300', _dark: 'purple.400' }, // highlight
      e: { _light: 'blue.200', _dark: 'blue.300' },
      f: { _light: 'gray.200', _dark: 'gray.800' }, // background - 真っ黒すぎない
      g: { _light: 'gray.50', _dark: 'gray.900' }, // background
      mode: { _light: 'gray.50', _dark: 'gray.800' },

      text: 'a',
      secondary: 'b',
      primary: 'c',
      highlight: 'd',
      bg: 'g',

      border: { _light: 'gray.200', _dark: 'gray.600' }, // ボーダーも調整
      header: 'c',
      error: { _light: 'red.500', _dark: 'red.300' },
    },
  },
}

export default extendTheme(overrides)
export * from './config'
