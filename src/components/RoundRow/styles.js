export const styles = theme => ({
  centerAlign: {
    textAlign: 'center',
  },
  emphasis: {
    fontWeight: 'bold',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})
