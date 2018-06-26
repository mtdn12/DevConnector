// Help variables https://material-ui-next.com/customization/theme-default/

import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

export const themeMui = createMuiTheme({
  palette: {
    type: 'light',
    primary: { light: blue[300], main: blue[500], dark: blue[700] },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiInput: {
      root: {
        border: `1px solid rgba(0,0,0,0.2)`,
        borderRadius: 10,
        padding: 3,
        marginBottom: 10,
        '& + p': {
          marginBottom: 10,
        },
      },
      focused: {
        border: `1px solid ${blue[300]}`,
      },
      error: {
        border: `1px solid ${red[300]}`,
        '& + p': {
          color: red[300],
        },
      },
    },
  },
})

export default themeMui
