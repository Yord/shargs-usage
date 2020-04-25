const optsMap = (f = a => a) => usageFunction => (opts = []) => (
  usageFunction(opts.map(f))
)

module.exports = {
  optsMap
}