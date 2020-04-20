const {decorate, justArgs, noCommands, pad} = require('..')

const id = a => a

test('decorate combines usage decorators', () => {
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

test('decorate combines layout decorators', () => {
  const style = {
    line: {width: 40}
  }

  const res = decorate(
    pad(['line'], 4),
    pad(['line'], 4)
  )(id)(style)

  const exp = {
    line: {padStart: 8, width: 32}
  }

  expect(res).toStrictEqual(exp)
})