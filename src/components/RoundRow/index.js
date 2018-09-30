import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core'
import { styles } from './styles'
import { TableRow } from '@material-ui/core'
import {
  Lock,
  Computer,
  StayCurrentPortrait,
  Check,
  Close,
  CheckCircle,
} from '@material-ui/icons'
import TableCell from '../StyledTableCell'

const renderStatus = status => {
  switch (status) {
    case 'CLOSED': {
      return (
        <span title={status}>
          <CheckCircle color={'primary'} />
        </span>
      )
    }
    default: {
      return status
    }
  }
}

const renderClient = client => {
  switch (client) {
    case 'DESKTOP': {
      return (
        <span title={client}>
          <Computer color={'action'} />
        </span>
      )
    }
    case 'MOBILE': {
      return (
        <span title={client}>
          <StayCurrentPortrait color={'action'} />
        </span>
      )
    }
    default: {
      return client
    }
  }
}

const renderBoolean = bool => {
  return Boolean(bool) ? <Check color={'primary'} /> : <Close color={'error'} />
}

const RoundRow = props => {
  const { round, key } = props
  const { classes } = props
  return (
    <TableRow key={key} className={classes.row}>
      <TableCell>{renderStatus(round.status)}</TableCell>
      <TableCell className={classes.emphasis}>{round.gameName}</TableCell>
      <TableCell>{round.id}</TableCell>
      <TableCell numeric>{round.operatorId}</TableCell>
      <TableCell numeric>{round.gameId}</TableCell>
      <TableCell numeric>{round.accountId}</TableCell>
      <TableCell>{round.purchaseMode}</TableCell>
      <TableCell className={classes.centerAlign}>
        {renderClient(round.clientMode)}
      </TableCell>
      <TableCell className={classes.emphasis} numeric>{`${round.currency} ${
        round.totalBet
      }`}</TableCell>
      <TableCell className={classes.emphasis} numeric>{`${round.currency} ${
        round.totalWin
      }`}</TableCell>
      <TableCell className={classes.centerAlign}>
        {renderBoolean(round.feature)}
      </TableCell>
      <TableCell className={classes.centerAlign}>
        {renderBoolean(round.competitionAffected)}
      </TableCell>
      <TableCell numeric>{round.formated.created}</TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(RoundRow)
