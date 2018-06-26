const styles = theme => ({
  contentWrapper: {
    padding: 20,
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    color: theme.palette.common.white,
    position: 'relative',
  },
  formContent: {
    maxWidth: 800,
    margin: '20px auto',
    background: theme.palette.common.white,
    padding: 20,
    borderRadius: 20,
  },
  btn: {
    position: 'absolute',
    top: 30,
    left: 50,
  },
  errorWrapper: {
    color: theme.palette.error.light,
    marginBottom: 10,
  },
})

export default styles
