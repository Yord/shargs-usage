const decorate = (f, ...fs) => usageFunction => (
  [f, ...fs].reduce((uf, f) => f(uf), usageFunction)
)

module.exports = {
  decorate
}