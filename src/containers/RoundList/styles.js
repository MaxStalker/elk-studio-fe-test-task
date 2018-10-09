//@flow
type ThemeType = {
  spacing: {
    unit: number,
  },
  palette: {
    background: {
      default: string,
    },
  },
}
export const styles = (theme: ThemeType): {} => ({
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
  contentPadding: {
    padding: theme.spacing.unit * 4,
  },
  topPadding: {
    paddingTop: theme.spacing.unit * 3,
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
