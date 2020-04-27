const {layout, table, text, textFrom, usageMap} = require('../..')

test('usageMap generates expected string', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const style = {
    line: [{width: 40}],
    desc: [{padStart: 4, width: 36}]
  }
  
  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    textFrom('desc')(desc)
  ]))(opts)(style)

  const txt = '-a, --answer                            \n' +
              '    The answer.                         \n' +
              '-h, --help                              \n' +
              '    Prints help.                        \n' +
              '--version                               \n' +
              '    Prints version.                     \n'

  expect(res).toStrictEqual(txt)
})