const {decorate, justArgs, line, noSubcommands, pad} = require('..')

test('decorate combines usage decorators', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const id = opts => () => JSON.stringify(opts)

  const res = decorate(
    justArgs(['-a', '-h']),
    noSubcommands
  )(id)(opts)()

  const exp = JSON.stringify({opts: opts.opts.slice(0, 1)})

  expect(res).toStrictEqual(exp)
})

test('decorate combines layout decorators', () => {
  const style = {
    line: [{width: 10}]
  }

  const id = line('a')

  const res = decorate(
    pad(['line', 0], 4),
    pad(['line', 0], 4)
  )(id)(style)

  const exp = '        a \n'

  expect(res).toStrictEqual(exp)
})