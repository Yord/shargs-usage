const {optsDef, optsDefWith} = require('..')

test('optsDef README example works as expected', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }
  
  const style = {
    line: [{width: 40}]
  }
  
  const res = optsDef(opts)(style)

  const txt = '-a, --answer=<number>                   \n' +
              '    The answer.                         \n' +
              '-h, --help                              \n' +
              '    Prints help.                        \n' +
              '--version                               \n' +
              '    Prints version.                     \n'
  
  expect(res).toStrictEqual(txt)
})

test('optsDef does not show an args description if descArg is an empty string', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['--answer'], desc: 'The answer.'},
      {key: 'answer2', types: ['number'], args: ['--answer2'], descArg: '', desc: 'The answer.'}
    ]
  }
  
  const style = {
    line: [{width: 40}]
  }
  
  const res = optsDef(opts)(style)

  const txt = '--answer=<number>                       \n' +
              '    The answer.                         \n' +
              '--answer2                               \n' +
              '    The answer.                         \n'
  
  expect(res).toStrictEqual(txt)
})

test('optsDef works as expected', () => {
  const opts = {
    opts: [
      {key: 'answer', opts: [], args: ['answer'], desc: 'The answer.', required: true},
      {key: 'foo', types: ['string'], args: ['-f', '--foo'], desc: 'Foo.', only: ['foo', 'bar'], required: false},
      {key: 'baz', types: ['bool'], args: ['-b', '--baz'], desc: 'Baz.', descArg: 'baz', defaultValues: [42], implies: ['foo']},
      {key: 'help', types: [], args: ['--help', 'help', '-h'], desc: 'Prints help.', defaultValues: [false]},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.', contradicts: ['help']},
      {key: 'position', types: ['number', 'number'], args: ['--pos'], desc: 'The position.'},
      {key: 'question', types: ['string'], required: true, desc: 'The question.'},
      {key: 'politePhrase', desc: 'Polite phrases.'},
      {now: 'something', completely: 'different'}
    ]
  }

  const style = {
    line: [{width: 60}]
  }

  const res = optsDef(opts)(style)

  const txt = 'answer [required]                                           \n' +
              '    The answer.                                             \n' +
              '-f, --foo=<foo|bar> [not required]                          \n' +
              '    Foo.                                                    \n' +
              '-b, --baz=<baz> [default: 42] [implies: -f, --foo]          \n' +
              '    Baz.                                                    \n' +
              '-h, help, --help [default: false]                           \n' +
              '    Prints help.                                            \n' +
              '--version [contradicts: --help, help, -h]                   \n' +
              '    Prints version.                                         \n' +
              '--pos=<number number>                                       \n' +
              '    The position.                                           \n' +
              '<question> [required]                                       \n' +
              '    The question.                                           \n' +
              '<politePhrase>...                                           \n' +
              '    Polite phrases.                                         \n'

  expect(res).toStrictEqual(txt)
})

test('optsDef prints an empty string if opts are empty', () => {
  const opts = {}

  const style = {
    line: [{width: 42}]
  }
  
  const res = optsDef(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsDef prints an empty string if opts has undefined entries', () => {
  const opts = {
    opts: [undefined, undefined]
  }

  const style = {
    line: [{width: 42}]
  }
  
  const res = optsDef(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsDef prints an empty string if opts are undefined', () => {
  const style = {
    line: [{width: 42}]
  }
  
  const res = optsDef()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsDef prints contradicts, default, implies and required, in this order', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', required: false, defaultValues: ['a'], contradicts: ['b'], implies: ['c']},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.'},
      {key: 'c', types: [], args: ['-c'], desc: 'A c.'}
    ]
  }

  const style = {
    line: [{width: 80}]
  }

  const res = optsDef(opts)(style)

  const txt = '-a [contradicts: -b] [default: a] [implies: -c] [not required]                  \n' +
              '    An a.                                                                       \n' +
              '-b                                                                              \n' +
              '    A b.                                                                        \n' +
              '-c                                                                              \n' +
              '    A c.                                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('optsDef does not print different defaultValues format', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', defaultValues: 'wrong format'},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.', defaultValues: [1, 2]}
    ]
  }

  const style = {
    line: [{width: 80}]
  }

  const res = optsDef(opts)(style)

  const txt = '-a                                                                              \n' +
              '    An a.                                                                       \n' +
              '-b [default: [1, 2]]                                                            \n' +
              '    A b.                                                                        \n'

  expect(res).toStrictEqual(txt)
})

test('optsDef collects args from the same key', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', implies: ['b']},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.'},
      {key: 'b', types: [], args: ['--no-b'], desc: 'Not a b.'}
    ]
  }

  const style = {
    line: [{width: 80}]
  }

  const res = optsDef(opts)(style)

  const txt = '-a [implies: -b, --no-b]                                                        \n' +
              '    An a.                                                                       \n' +
              '-b                                                                              \n' +
              '    A b.                                                                        \n' +
              '--no-b                                                                          \n' +
              '    Not a b.                                                                    \n'

  expect(res).toStrictEqual(txt)
})

test('optsDef uses default style if style is undefined', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true},
      {key: 'foo', types: ['string'], args: ['-f', '--foo'], desc: 'Foo.', only: ['foo', 'bar'], required: false},
      {key: 'baz', types: ['bool'], args: ['-b', '--baz'], desc: 'Baz.', descArg: 'baz', defaultValues: [42], implies: ['foo']},
      {key: 'help', types: [], args: ['--help', 'help', '-h'], desc: 'Prints help.', defaultValues: [false]},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.', contradicts: ['help']},
      {key: 'question', types: ['string'], required: true, desc: 'The question.'},
      {key: 'politePhrases', descArg: 'phrases', desc: 'Polite phrases.'}
    ]
  }

  const res = optsDef(opts)()

  const txt = '-a, --answer=<number> [required]                                                \n' +
              '    The answer.                                                                 \n' +
              '-f, --foo=<foo|bar> [not required]                                              \n' +
              '    Foo.                                                                        \n' +
              '-b, --baz=<baz> [default: 42] [implies: -f, --foo]                              \n' +
              '    Baz.                                                                        \n' +
              '-h, help, --help [default: false]                                               \n' +
              '    Prints help.                                                                \n' +
              '--version [contradicts: --help, help, -h]                                       \n' +
              '    Prints version.                                                             \n' +
              '<question> [required]                                                           \n' +
              '    The question.                                                               \n' +
              '<phrases>...                                                                    \n' +
              '    Polite phrases.                                                             \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefWith correctly passes on id', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true}
    ]
  }

  const style = {
    line2: [{width: 40}]
  }

  const res = optsDefWith({id: 'line2'})(opts)(style)

  const txt = '-a, --answer=<number> [required]        \n' +
              '    The answer.                         \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefWith correctly passes on padding', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true}
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = optsDefWith({padding: 2})(opts)(style)

  const txt = '-a, --answer=<number> [required]        \n' +
              '  The answer.                           \n'

  expect(res).toStrictEqual(txt)
})