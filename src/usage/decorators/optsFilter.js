const optsFilter = (p = () => true) => usageFunction => (opt = {}) => (
  usageFunction({...opt, opts: (opt.opts || []).filter(p)})
)

module.exports = {
  optsFilter
}