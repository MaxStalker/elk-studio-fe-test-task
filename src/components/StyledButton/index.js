import React from 'react'
import { Button, withStyles } from '@material-ui/core'
import { withProps } from 'recompose'

const StyledButton = withStyles({
  root: {
    background: '#3f51b5',
  },
  label: {
    textTransform: 'capitalize',
    color: 'white',
  },
})(Button)

export default StyledButton
