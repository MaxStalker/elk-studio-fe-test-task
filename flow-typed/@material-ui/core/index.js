//@flow
import React, { type ComponentType, type Component, type Node } from 'react'
declare module '@material-ui/core' {
  declare type CurriedFunc = (component: Component) => Component
  declare export function withStyles(styles: {}): CurriedFunc
  declare export function withTheme(theme: {}): CurriedFunc
  declare export var TableRow: Component
  declare export var Grid: Component
  declare export var Paper: Component
  declare export var FormControl: Component
  declare export var InputLabel: Component
  declare export var Input: Component
  declare export var TableRow: Component
  declare export var InputAdornment: Component
  declare export var IconButton: Component
  declare export var Button: Component
  declare export var Card: Component
  declare export var CardMedia: Component
  declare export var CardContent: Component
  declare export var CssBaseline: Component
  declare export var AppBar: Component
  declare export var Toolbar: Component
  declare export var Typography: Component
  declare export var Table: Component
  declare export var TableHead: Component
  declare export var TableBody: Component
  declare export var TableCell: Component
  declare export var CircularProgress: Component
}
