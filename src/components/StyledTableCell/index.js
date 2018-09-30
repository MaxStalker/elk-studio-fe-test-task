import React from 'react'
import { TableCell, withStyles } from '@material-ui/core'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    padding: theme.spacing.unit * 2,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
    padding: theme.spacing.unit * 2,
  },
}))(TableCell)

export default StyledTableCell
