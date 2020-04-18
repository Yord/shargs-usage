const {decorate, justArgs, noCommands}   = require('../../..')

const id = opts => opts

test('decorate combines decorators', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = decorate(
    justArgs(['-a', '-h']),
    noCommands
  )(id)(opts)

  expect(res).toStrictEqual(opts.slice(0, 1))
})