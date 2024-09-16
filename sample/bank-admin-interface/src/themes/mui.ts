import { createTheme } from '@mui/material/styles'
import YekanBakhRegularWoff2 from '@/assets/fonts/YekanBakh-Regular.woff2'

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'YekanBakh, Arial',
  },
  palette: {
    background: {
      default: '#ebebeb',
    },
    primary: {
      main: '#4E46B4',
    },
    secondary: {
      main: '#EBEBEB',
    },
    success: {
      main: '#4AD15F',
    },
    error: {
      main: '#FF4E64',
      dark: '#D33030',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'YekanBakh';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('YekanBakh'), local('YekanBakh-Regular'), url(${YekanBakhRegularWoff2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})
