//@flow
declare module 'redux-thunk-actions' {
  declare export function createActionThunk(
    type: string,
    (...args: Array<any>) => any,
  ): {}
}
