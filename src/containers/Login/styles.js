export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2,
  },
  bottomMargin2: {
    marginBottom: theme.spacing.unit * 4,
  },
  textField: {},
  submit: {
    padding: '40px',
  },
  formContainer: {
    padding: theme.spacing.unit * 5,
  },
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 4,
    backgroundColor: '#2196f3',
  },
})
