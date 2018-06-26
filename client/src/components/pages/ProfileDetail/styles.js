import {lightBlue} from '@material-ui/core/colors'

const styles = theme => ({
  loadingWrap: {
    marginTop: 50,
    textAlign: 'center',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    background: theme.palette.common.white,
    borderRadius: 30,
    padding: 30,
  },
  avatar: {
    display: 'inline-block',
    width: '25%',
    height: '25%',
  },
  jumbotron: {
    textAlign: 'center',
    padding: 20,
    color: theme.palette.common.white,
    borderRadius: 20,
    background: lightBlue[900]
  },
  socialLink: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    fontSize: 25,
    margin: '0 5px',
  },
  skillItem: {
    margin: '0 10px',
    color: theme.palette.common.black,
  },
  section1: {
    padding: 20,
    color: lightBlue[900],
    marginTop: 30,
    borderRadius: 20,
    '& > div:first-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: 20,
    },
    '& > div:last-child': {
      paddingTop: 20,
    },
  },
  section2: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      width: '45%',
    },
    marginTop: 30,
    color: lightBlue[900],
  },
  paperItem: {
    padding: 20,
    borderRadius: 20,
    margin: '10px 0',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
  },
  bg: {
    padding: 20,
    background: 'linear-gradient(to right, #e6dada, #274046)',
    minHeight: 'calc(100vh - 64px)',
  },
  Link: {
    textDecoration: 'none',
    marginBottom: 20,
    display: 'inline-block',
  },
})

export default styles
