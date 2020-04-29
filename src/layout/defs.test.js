const {defs, defsWith} = require('..')

test('defs generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = defs([
    [
      '-h, --help',
      'Prints the help.'
    ],
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])(style)

  const txt = '-h, --help                              \n' +
              '    Prints the help.                    \n' +
              '-v, --version                           \n' +
              '    Prints the version.                 \n'

  expect(res).toStrictEqual(txt)
})

test('defs generates string with default style if style is undefined', () => {
  const res = defs([
    [
      '-h, --help',
      'Prints the help.'
    ],
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])()

  const txt = '-h, --help                                                                      \n' +
              '    Prints the help.                                                            \n' +
              '-v, --version                                                                   \n' +
              '    Prints the version.                                                         \n'

  expect(res).toStrictEqual(txt)
})

test('defs uses empty strings if columns are shorter than two elements', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = defs([
    [
      '-h, --help'
    ],
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])(style)

  const txt = '-h, --help                              \n' +
              '                                        \n' +
              '-v, --version                           \n' +
              '    Prints the version.                 \n'

  expect(res).toStrictEqual(txt)
})

test('defs prints empty strings if columns are undefined', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = defs()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('defs prints empty lines for each undefined columns entry', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = defs([
    [
      '-h, --help',
      'Prints the help.'
    ],
    undefined,
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])(style)

  const txt = '-h, --help                              \n' +
              '    Prints the help.                    \n' +
              '                                        \n' +
              '                                        \n' +
              '-v, --version                           \n' +
              '    Prints the version.                 \n'

  expect(res).toStrictEqual(txt)
})

test('defsWith correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    line: [{width: 40}],
    test: [{width: 30}]
  }
  
  const res = defsWith({id})([
    [
      '-h, --help',
      'Prints the help.'
    ],
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])(style)

  const txt = '-h, --help                    \n' +
              '    Prints the help.          \n' +
              '-v, --version                 \n' +
              '    Prints the version.       \n'

  expect(res).toStrictEqual(txt)
})

test('defsWith correctly passes on num', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = defsWith({num: 2})([
    [
      '-h, --help',
      'Prints the help.'
    ],
    [
      '-v, --version',
      'Prints the version.'
    ]
  ])(style)

  const txt = '-h, --help                              \n' +
              '  Prints the help.                      \n' +
              '-v, --version                           \n' +
              '  Prints the version.                   \n'

  expect(res).toStrictEqual(txt)
})