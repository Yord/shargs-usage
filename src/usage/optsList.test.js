const {optsList, optsListWith} = require('..')

test('optsList README example works as expected', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }
  
  const style = {
    cols: [
      {width: 30},
      {width: 25}
    ]
  }
  
  const res = optsList(opts)(style)

  const txt = '-a, --answer=<number>         The answer.              \n' +
              '-h, --help                    Prints help.             \n' +
              '--version                     Prints version.          \n'
  
  expect(res).toStrictEqual(txt)
})

test('optsList does not show an args description if descArg is an empty string', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['--answer'], desc: 'The answer.'},
      {key: 'answer2', types: ['number'], args: ['--answer2'], descArg: '', desc: 'The answer.'}
    ]
  }
  
  const style = {
    cols: [
      {width: 30},
      {width: 25}
    ]
  }
  
  const res = optsList(opts)(style)

  const txt = '--answer=<number>             The answer.              \n' +
              '--answer2                     The answer.              \n'
  
  expect(res).toStrictEqual(txt)
})

test('optsList works as expected', () => {
  const opts = {
    opts: [
      {key: 'answer', opts: [], args: ['answer'], desc: 'The answer.', required: true},
      {key: 'foo', types: ['string'], args: ['-f'], desc: 'Foo.', only: ['foo', 'bar'], required: false},
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
    cols: [
      {width: 25},
      {width: 50}
    ]
  }

  const res = optsList(opts)(style)

  const txt = 'answer                   The answer. [required]                            \n' +
              '-f <foo|bar>             Foo. [not required]                               \n' +
              '-b, --baz=<baz>          Baz. [default: 42] [implies: -f]                  \n' +
              '-h, help, --help         Prints help. [default: false]                     \n' +
              '--version                Prints version. [contradicts: --help, help, -h]   \n' +
              '--pos=<number number>    The position.                                     \n' +
              '<question>               The question. [required]                          \n' +
              '<politePhrase>...        Polite phrases.                                   \n'

  expect(res).toStrictEqual(txt)
})

test('optsList prints an empty string if opts are empty', () => {
  const opts = {}

  const style = {
    cols: [
      {width: 25},
      {width: 50}
    ]
  }
  
  const res = optsList(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsList prints an empty string if opts has undefined entries', () => {
  const opts = {
    opts: [undefined, undefined]
  }

  const style = {
    cols: [
      {width: 25},
      {width: 50}
    ]
  }
  
  const res = optsList(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsList prints an empty string if opts are undefined', () => {
  const style = {
    cols: [
      {width: 25},
      {width: 55}
    ]
  }
  
  const res = optsList()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsList prints contradicts, default, implies and required, in this order', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', required: false, defaultValues: ['a'], contradicts: ['b'], implies: ['c']},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.'},
      {key: 'c', types: [], args: ['-c'], desc: 'A c.'}
    ]
  }

  const style = {
    cols: [
      {width: 5},
      {width: 70}
    ]
  }

  const res = optsList(opts)(style)

  const txt = '-a   An a. [contradicts: -b] [default: a] [implies: -c] [not required]     \n' +
              '-b   A b.                                                                  \n' +
              '-c   A c.                                                                  \n'

  expect(res).toStrictEqual(txt)
})

test('optsList does not print different defaultValues format', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', defaultValues: 'wrong format'},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.', defaultValues: [1, 2]}
    ]
  }

  const style = {
    cols: [
      {width: 5},
      {width: 70}
    ]
  }

  const res = optsList(opts)(style)

  const txt = '-a   An a.                                                                 \n' +
              '-b   A b. [default: [1, 2]]                                                \n'

  expect(res).toStrictEqual(txt)
})

test('optsList collects args from the same key', () => {
  const opts = {
    opts: [
      {key: 'a', types: [], args: ['-a'], desc: 'An a.', implies: ['b']},
      {key: 'b', types: [], args: ['-b'], desc: 'A b.'},
      {key: 'b', types: [], args: ['--no-b'], desc: 'Not a b.'}
    ]
  }

  const style = {
    cols: [
      {width: 10},
      {width: 65}
    ]
  }

  const res = optsList(opts)(style)

  const txt = '-a        An a. [implies: -b, --no-b]                                      \n' +
              '-b        A b.                                                             \n' +
              '--no-b    Not a b.                                                         \n'

  expect(res).toStrictEqual(txt)
})

test('optsList uses default style if style is undefined', () => {
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

  const res = optsList(opts)()

  const txt = '-a, --answer=<number>    The answer. [required]                                 \n' +
              '-f, --foo=<foo|bar>      Foo. [not required]                                    \n' +
              '-b, --baz=<baz>          Baz. [default: 42] [implies: -f, --foo]                \n' +
              '-h, help, --help         Prints help. [default: false]                          \n' +
              '--version                Prints version. [contradicts: --help, help, -h]        \n' +
              '<question>               The question. [required]                               \n' +
              '<phrases>...             Polite phrases.                                        \n'

  expect(res).toStrictEqual(txt)
})

test('optsListWith correctly passes on id', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true}
    ]
  }

  const style = {
    cols2: [
      {width: 40},
      {width: 40}
    ]
  }

  const res = optsListWith({id: 'cols2'})(opts)(style)

  const txt = '-a, --answer=<number>                   The answer. [required]                  \n'

  expect(res).toStrictEqual(txt)
})

test('optsListWith with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'
  
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true}
    ]
  }

  const style = {
    [id1]: [
      {width: 40},
      {width: 40}
    ]
  }

  const res = optsListWith({id: id2})(opts)(style)

  const txt = '-a, --answer=<number>    The answer. [required]                                 \n'

  expect(res).toStrictEqual(txt)
})

test('optsListWith with undefined id uses default id', () => {
  const defaultId = 'cols'

  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true}
    ]
  }

  const style = {
    [defaultId]: [
      {width: 40},
      {width: 40}
    ]
  }

  const res = optsListWith({})(opts)(style)

  const txt = '-a, --answer=<number>                   The answer. [required]                  \n'

  expect(res).toStrictEqual(txt)
})