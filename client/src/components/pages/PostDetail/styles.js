const styles = theme => ({
  loadingWrap: {
    marginTop: 50,
    textAlign: 'center',
  },
  postWrapper: {
    margin: '10px 0',
    padding: 10,
    borderRadius: 10,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
  },
  subtitle: {
    padding: 15,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  form: {
    padding: 20,
    marginBottom: 30,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    '& textarea': {
      padding: 10,
    },
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 20,
    borderRadius: 30,
    background: theme.palette.common.white,
  },
  bg: {
    padding: 30,
    minHeight: 'calc(100vh - 64px)',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
  },
})

export default styles
