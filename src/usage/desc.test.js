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

test('desc uses default style if style is undefined', () => {
  const opts = {
    opts: [],
    desc: (
      'Deep Thought was created to come up with the Answer to ' +
      'The Ultimate Question of Life, the Universe, and Everything.'
    )
  }

  const res = desc(opts)()

  const txt = 'Deep Thought was created to come up with the Answer to The Ultimate Question of \n' +
              'Life, the Universe, and Everything.                                             \n'

  expect(res).toStrictEqual(txt)
})

test('desc assumes empty opts if opts is undefined', () => {
  const opts = {
    desc: 'Deep Thought was created to come up with the Answer.'
  }

  const style = {
    line: [{width: 40}]
  }

  const res = desc(opts)(style)

  const txt = 'Deep Thought was created to come up with the Answer to The Ultimate Question of \n' +
              'Life, the Universe, and Everything.                                             \n'

  expect(res).toStrictEqual(txt)
})