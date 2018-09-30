import React from 'react'
import { TableHead, TableRow, withStyles } from '@material-ui/core'
import TableCell from '../../components/StyledTableCell'
import { styles } from '../../components/RoundRow/styles'
const TableHeadRenderer = ({ classes }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Status</TableCell>
        <TableCell>Game Name</TableCell>
        <TableCell>Round Id</TableCell>
        <TableCell numeric>Operator Id</TableCell>
        <TableCell numeric>GameId</TableCell>
        <TableCell numeric>Account Id</TableCell>
        <TableCell>Purchase Mode</TableCell>
        <TableCell className={classes.centerAlign}>Client Mode</TableCell>
        <TableCell numeric>Total Bet</TableCell>
        <TableCell numeric>Total Win</TableCell>
        <TableCell className={classes.centerAlign}>Feature</TableCell>
        <TableCell className={classes.centerAlign}>Competition</TableCell>
        <TableCell numeric>Created</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default withStyles(styles)(TableHeadRenderer)
