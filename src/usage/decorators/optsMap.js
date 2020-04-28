const optsMap = (f = a => a) => usageFunction => (opt = {}) => (
  usageFunction({...opt, opts: (opt.opts || []).map(f)})
)

module.exports = {
  optsMap
}