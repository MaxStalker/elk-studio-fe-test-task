//@flow
declare module 'superagent' {
  declare export default function request(...args: Array<any>): Promise<any>
}
