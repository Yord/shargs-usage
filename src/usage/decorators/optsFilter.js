const optsFilter = (p = () => true) => usageFunction => (opts = []) => (
  usageFunction(opts.filter(p))
)

module.exports = {
  optsFilter
}