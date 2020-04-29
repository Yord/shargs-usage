const {br, brWith} = require('..')

test('br generates expected string', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = br(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})

test('brWith correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: [{width: 40}]
  }

  const res = brWith({id})(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})