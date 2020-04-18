const {onlyFirstArg, optsList} = require('../..')

const id = opts => opts

test('onlyFirstArg README example works', () => {
  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }
  
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]
  
  const res = onlyFirstArg(optsList)(opts)(style)

  const exp = '-a <number>         The answer.         \n' +
              '-h                  Prints help.        \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg filters one opt', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = onlyFirstArg(id)(opts)

  const exp = [
    {key: 'answer', types: ['number'], args: ['-a'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg returns empty array if args is undefined', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', desc: 'Prints version.'}
  ]

  const res = onlyFirstArg(id)(opts)

  const exp = [
    {key: 'answer', types: ['number'], args: ['-a'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h'], desc: 'Prints help.'},
    {key: 'version', args: [], desc: 'Prints version.'}
  ]

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg returns an empty list if opts are empty', () => {
  const opts = []

  const res = onlyFirstArg(id)(opts)

  expect(res).toStrictEqual([])
})

test('onlyFirstArg returns an empty list if opts are undefined', () => {
  const res = onlyFirstArg(id)()

  expect(res).toStrictEqual([])
})