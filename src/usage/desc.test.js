const {desc, descFrom} = require('..')

test('desc README example works as expected', () => {
  const opts = {
    opts: [],
    desc: 'Deep Thought was created to come up with the Answer.'
  }
  
  const style = {
    line: [{width: 40}]
  }
  
  const res = desc(opts)(style)

  const txt = 'Deep Thought was created to come up with\n'+
              'the Answer.                             \n'
  
  expect(res).toStrictEqual(txt)
})

test('desc returns an empty line if no descArg is given', () => {
  const opts = {
    opts: []
  }

  const style = {
    line: [{width: 40}]
  }

  const res = desc(opts)(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})