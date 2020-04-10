const usage = require('./usage')
const {optsList} = require('../optsList')

test('usage generates expected string', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: null, args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }

  const res = usage([
    optsList
  ])(opts)(style)

  const txt = '-a,                 The answer.         \n' +
              '--answer=<number>                       \n' +
              '-h, --help          Prints help.        \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(txt)
})

test('usage returns the empty string if no functions are defined', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: null, args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const style = {
    line: {width: 40}
  }

  const res = usage()(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('usage returns the empty string if functions are empty', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: null, args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const style = {
    line: {width: 40}
  }

  const res = usage([])(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('usage uses default style if style is undefined', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: null, args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = usage([
    optsList
  ])(opts)()

  const txt = '-a, --answer=<number>    The answer.                                            \n' +
              '-h, --help               Prints help.                                           \n' +
              '--version                Prints version.                                        \n'

  expect(res).toStrictEqual(txt)
})

test('usage passes on empty opts if opts are undefined', () => {
  const style = {
    line: {width: 40}
  }

  const res = usage([
    optsList
  ])()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})