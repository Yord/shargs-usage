const {line, lineWith} = require('..')

test('line generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = line('A line')(style)

  const txt = 'A line                                  \n'

  expect(res).toStrictEqual(txt)
})

test('line is cut off if it surpasses the width', () => {
  const style = {
    line: [{width: 3}]
  }

  const res = line('A line')(style)

  const txt = 'A l\n'

  expect(res).toStrictEqual(txt)
})

test('line with undefined string prints an empty line', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = line()(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})

test('line with undefined style uses the default style', () => {
  const res = line('A line')()

  const txt = 'A line                                                                          \n'

  expect(res).toStrictEqual(txt)
})

test('line with too few style entries uses default style', () => {
  const style = {
    line: []
  }

  const res = line('A line')(style)

  const txt = 'A line                                                                          \n'

  expect(res).toStrictEqual(txt)
})

test('line without width in style object uses default width', () => {
  const style = {
    line: [{padStart: 5}]
  }

  // @ts-ignore
  const res = line('A line')(style)

  const txt = '     A line                                                                          \n'

  expect(res).toStrictEqual(txt)
})

test('lineWith correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: [{width: 40}]
  }

  const res = lineWith({id})('A line')(style)

  const txt = 'A line                                  \n'

  expect(res).toStrictEqual(txt)
})

test('lineWith with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'
  
  const style = {
    [id1]: [{width: 40}]
  }

  const res = lineWith({id: id2})('A line')(style)

  const txt = 'A line                                                                          \n'

  expect(res).toStrictEqual(txt)
})

test('lineWith with undefined id uses default id', () => {
  const defaultId = 'line'

  const style = {
    [defaultId]: [{width: 40}]
  }

  const res = lineWith({})('A line')(style)

  const txt = 'A line                                  \n'

  expect(res).toStrictEqual(txt)
})