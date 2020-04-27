const optsFilter = (p = () => true) => usageFunction => ({opts = []} = {}) => (
  usageFunction({opts: opts.filter(p)})
)

module.exports = {
  optsFilter
}