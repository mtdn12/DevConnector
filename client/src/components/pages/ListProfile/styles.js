import {indigo} from '@material-ui/core/colors'

const styles = theme => ({
  avatar: {
    width: '95%',
    height: '95%',
  },
  loadingWrap: {
    marginTop: 50,
    textAlign: 'center',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    background: theme.palette.common.white,
    borderRadius: 30,
    padding: 20,
  },
  paper: {
    margin: '20px 0',
    padding: 20,
    borderRadius: 30,
    background: indigo[100],
  },
  bg: {
    padding: 30,
    background: 'linear-gradient(to right, #4b6cb7, #182848)',
    minHeight: 'calc(100vh - 64px)',
  },
  skill: {
    background: theme.palette.common.white,
    padding: 10,
    margin: '10px 0',
    borderRadius: 10,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
