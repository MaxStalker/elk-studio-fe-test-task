export const buildQuery = (args: { [key: string]: any }) => {
  let query = '?'
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      query += `${key}=${args[key]}&`
    }
  }
  return query.length === 1 ? '' : query.slice(0, -1)
}
