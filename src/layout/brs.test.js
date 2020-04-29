const {brs, brsWith} = require('..')

test('brs generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = brs(2)(style)

  const txt = '                                        \n' +
              '                                        \n'

  expect(res).toStrictEqual(txt)
})

test('brs with default length generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = brs()(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})

test('brsWith correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: [{width: 40}]
  }

  const res = brsWith({id})(2)(style)

  const txt = '                                        \n' +
              '                                        \n'

  expect(res).toStrictEqual(txt)
})