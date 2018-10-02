//@flow
import React, { Component, Fragment, type Node } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRounds } from './../../modules/reducers/rounds'
import { logout } from './../../modules/reducers/auth'
import {
  Grid,
  Paper,
  Table,
  TableBody,
  CircularProgress,
  withStyles,
} from '@material-ui/core'
import { styles } from './styles'
import RoundRow from '../../components/RoundRow'
import TableHeadRenderer from './TableHeadRenderer'
import AppBarRenderer from './AppBarRenderer'

type Props = {
  fetchRounds: (params: FetchRoundsParams) => void,
  logout: () => void,
  classes: {
    contentPading: {},
    root: {},
    table: {},
  },
  isLoading: boolean,
  roundsById: {},
  roundsList: [],
}

class RoundList extends Component<Props> {
  componentDidMount() {
    this.props.fetchRounds({
      accountId: 60137,
      dateFrom: '2018-08-16T00:30:10Z',
      operatorId: 7,
    })
  }
  renderLoading() {
    return (
      <div>
        <CircularProgress color="primary" />
        <p>Loading data, please wait...</p>
      </div>
    )
  }
  render() {
    const { isLoading, roundsById, roundsList } = this.props
    const { logout } = this.props
    const { classes } = this.props
    return (
      <Fragment>
        <AppBarRenderer actions={{ logout }} />
        <Grid container className={classNames(classes.contentPading)}>
          <Paper
            className={classNames(classes.root)}
            align={'center'}
            justify={'center'}
          >
            {isLoading ? (
              this.renderLoading()
            ) : (
              <Table className={classes.table}>
                <TableHeadRenderer />
                <TableBody>
                  {roundsList.map(
                    (id: number): Node => (
                      <RoundRow round={roundsById[id]} key={id} />
                    ),
                  )}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Fragment>
    )
  }
}
type State = {
  auth: {},
  rounds: {
    isLoading: boolean,
    byId: {},
    list: [],
  },
}
const mapStateToProps = (state: State): {} => ({
  auth: state.auth,
  isLoading: state.rounds.isLoading,
  roundsById: state.rounds.byId,
  roundsList: state.rounds.list,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRounds, logout }, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RoundList))
