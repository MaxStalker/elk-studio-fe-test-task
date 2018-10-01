// @flow
import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
} from '@material-ui/core'
import { Eject } from '@material-ui/icons'
import { styles } from './styles'
import classNames from 'classnames'

const AppBarRenderer = ({ actions: { logout }, classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          className={classNames(classes.grow, classes.appBarTitle)}
        >
          Rounds List
        </Typography>
        <IconButton
          title={'Logout'}
          role={'button'}
          aria-label={'logout-action'}
          onClick={logout}
          color="inherit"
        >
          <Eject />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(AppBarRenderer)
