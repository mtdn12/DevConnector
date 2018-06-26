import background from '../../../assets/img/background/welcome_backgound.jpeg'
const styles = theme => ({
  container: {
    /* background: `url('../../../assets/img/background/welcome_backgound.jpeg') no-repeat fixed center`, */
    background: `${
      theme.palette.common.black
    } url(${background}) no-repeat fixed center`,
    backgroundSize: 'cover',
    minHeight: 'calc(100vh - 64px )',
    position: 'relative',
  },
  darkOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    background: theme.palette.text.secondary,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1000,
    paddingTop: 150,
    color: theme.palette.common.white,
    '& > h1': {
      fontSize: 48,
      fontWeight: 700,
    },
    '& > p': {
      fontSize: 24,
    },
  },
  btnWrapper: {
    marginTop: 30,
    textAlign: 'center',
    '& > button:last-child': {
      marginLeft: 20,
      border: `1px solid ${theme.palette.common.white}`,
    },
  },
})

export default styles
