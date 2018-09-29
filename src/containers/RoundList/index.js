import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRounds } from './../../modules/reducers/rounds/index'
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core'
import { Lock, AccountCircle } from '@material-ui/icons'
import TableCell from './StyledTableCell'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
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

class RoundList extends Component {
  componentDidMount() {
    this.props.fetchRounds({
      accountId: 60137,
      dateFrom: '2018-08-16T00:30:10Z',
      operatorId: 7,
    })
  }
  renderStatus(status) {
    switch (status) {
      case 'CLOSED': {
        return (
          <span title={status}>
            <Lock color={'error'} />
          </span>
        )
      }
      default: {
        return status
      }
    }
  }
  renderRoundRow(round, key) {
    const { classes } = this.props
    return (
      <TableRow key={key} className={classes.row}>
        <TableCell>{round.id}</TableCell>
        <TableCell>{round.operatorId}</TableCell>
        <TableCell numeric>{round.gameId}</TableCell>
        <TableCell>{round.gameName}</TableCell>
        <TableCell numeric>{round.accountId}</TableCell>
        <TableCell>{this.renderStatus(round.status)}</TableCell>
        <TableCell>{round.purchaseMode}</TableCell>
        <TableCell>{round.clientMode}</TableCell>
        <TableCell numeric>{`${round.currency} ${round.totalBet}`}</TableCell>
        <TableCell numeric>{`${round.currency} ${round.totalWin}`}</TableCell>
        <TableCell>{round.feature.toString()}</TableCell>
        <TableCell>{round.competitionAffected.toString()}</TableCell>
        <TableCell>{round.created}</TableCell>
      </TableRow>
    )
  }
  renderLoading() {
    return (
      <div>
        <CircularProgress color="secondary" />
        <p>Loading data, please wait...</p>
      </div>
    )
  }
  render() {
    const { isLoading, roundsById, roundsList } = this.props
    const { classes } = this.props
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Rounds List
            </Typography>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          {isLoading ? <p>Loading data, please wait...</p> : null}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Operator Id</TableCell>
                <TableCell>GameId</TableCell>
                <TableCell>Game Name</TableCell>
                <TableCell numeric>Account Id</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Purchase Mode</TableCell>
                <TableCell>Client Mode</TableCell>
                <TableCell numeric>Total Bet</TableCell>
                <TableCell numeric>Total Win</TableCell>
                <TableCell>Feature</TableCell>
                <TableCell>Competition Affected</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roundsList.map(id => this.renderRoundRow(roundsById[id], id))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.rounds.isLoading,
  roundsById: state.rounds.byId,
  roundsList: state.rounds.list,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRounds }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RoundList))
