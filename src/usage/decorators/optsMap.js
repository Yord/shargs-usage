const optsMap = (f = a => a) => usageFunction => ({opts = []} = {}) => (
  usageFunction({opts: opts.map(f)})
)

module.exports = {
  optsMap
}