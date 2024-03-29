const {layout, table, text, textWith, usageMap} = require('../..')

test('usageMap generates expected string', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const style = {
    line: [{width: 40}]
  }
  
  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    text(desc)
  ]))(opts)(style)

  const txt = '-a, --answer                            \n' +
              'The answer.                             \n' +
              '-h, --help                              \n' +
              'Prints help.                            \n' +
              '--version                               \n' +
              'Prints version.                         \n'

  expect(res).toStrictEqual(txt)
})

test('usageMap uses default styles if style is undefined', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    text(desc)
  ]))(opts)()

  const txt = '-a, --answer                                                                    \n' +
              'The answer.                                                                     \n' +
              '-h, --help                                                                      \n' +
              'Prints help.                                                                    \n' +
              '--version                                                                       \n' +
              'Prints version.                                                                 \n'

  expect(res).toStrictEqual(txt)
})

test('usageMap uses default line style if style has no line attribute', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    text(desc)
  ]))(opts)()

  const txt = '-a, --answer                                                                    \n' +
              'The answer.                                                                     \n' +
              '-h, --help                                                                      \n' +
              'Prints help.                                                                    \n' +
              '--version                                                                       \n' +
              'Prints version.                                                                 \n'

  expect(res).toStrictEqual(txt)
})

test('usageMap returns empty string if opts are undefined', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    text(desc)
  ]))()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('usageMap returns empty string if opts are empty', () => {
  const opts = {}

  const style = {
    line: [{width: 40}]
  }
  
  const res = usageMap(({args, desc}) => layout([
    text(args.join(', ')),
    textWith({id: 'desc'})(desc)
  ]))(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('usageMap returns empty string if function is undefined', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const style = {
    line: [{width: 40}]
  }
  
  const res = usageMap()(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsTable README example works as expected', () => {
  const optsTable = usageMap(
    ({key, args, required, desc}) => table([
      [(required ? '*' : '') + key, args.join(', '), desc]
    ])
  )

  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const style = {
    cols: [{width: 10}, {width: 15}, {width: 15}]
  }
  
  const res = optsTable(opts)(style)

  const txt = '*answer   -a, --answer   The answer.    \n' +
              'help      -h, --help     Prints help.   \n' +
              'version   --version      Prints version.\n'

  expect(res).toStrictEqual(txt)
})