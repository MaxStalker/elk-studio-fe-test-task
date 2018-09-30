export const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  appBarTitle: {
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  },
  contentPading: {
    padding: theme.spacing.unit * 4,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})
