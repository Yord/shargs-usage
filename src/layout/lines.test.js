const {lines, linesWith} = require('..')

test('lines generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = lines([
    'First line',
    'Last line'
  ])(style)

  const txt = 'First line                              \n' +
              'Last line                               \n'

  expect(res).toStrictEqual(txt)
})

test('lines with undefined string prints the empty string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = lines()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('lines with undefined style uses the default style', () => {
  const res = lines([
    'First line',
    'Last line'
  ])()

  const txt = 'First line                                                                      \n' +
              'Last line                                                                       \n'

  expect(res).toStrictEqual(txt)
})

test('linesWith correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: [{width: 40}]
  }

  const res = linesWith({id})([
    'First line',
    'Last line'
  ])(style)

  const txt = 'First line                              \n' +
              'Last line                               \n'

  expect(res).toStrictEqual(txt)
})

test('linesWith with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'
  
  const style = {
    [id1]: [{width: 40}]
  }

  const res = linesWith({id: id2})([
    'First line',
    'Last line'
  ])(style)

  const txt = 'First line                                                                      \n' +
              'Last line                                                                       \n'

  expect(res).toStrictEqual(txt)
})

test('linesWith with undefined id uses default id', () => {
  const defaultId = 'line'

  const style = {
    [defaultId]: [{width: 40}]
  }

  const res = linesWith({})([
    'First line',
    'Last line'
  ])(style)

  const txt = 'First line                              \n' +
              'Last line                               \n'

  expect(res).toStrictEqual(txt)
})