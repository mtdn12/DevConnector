const styles = theme => ({
  btnWrapper: {
    display: 'flex',
    margin: '10px 0',
  },
  btnCenter: {
    margin: '0 10px',
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 20,
    background: theme.palette.common.white,
    borderRadius: 30,
  },
  btnDelete: {
    marginTop: 30,
  },
  background: {
    background: 'linear-gradient(to right, #00416a, #e4e5e6)',
    minHeight: 'calc(100vh - 64px)',
    paddingTop: 30,
  },
  loadingWrap: {
    marginTop: 50,
    textAlign: 'center',
  },
})

export default styles
