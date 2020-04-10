const {text, textFrom} = require('./text')

test('text generates expected string', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = text('Deep Thought was created to come up with the Answer.')(style)

  const txt = 'Deep Thought was created to come up with\n' +
              'the Answer.                             \n'

  expect(res).toStrictEqual(txt)
})

test('text retains more than one consecutive whitespace even after line breaks', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = text('Deep Thought was created to come up with  the Answer.')(style)

  const txt = 'Deep Thought was created to come up with\n' +
              '  the Answer.                           \n'

  expect(res).toStrictEqual(txt)
})

test('text prints an empty line if no string is given', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = text()(style)

  const txt = '                                        \n'

  expect(res).toStrictEqual(txt)
})

test('text uses default style if style is undefined', () => {
  const res = text(
    'Deep Thought was created to come up with the Answer to ' +
    'The Ultimate Question of Life, the Universe, and Everything.'
  )()

  const txt = 'Deep Thought was created to come up with the Answer to The Ultimate Question of \n' +
              'Life, the Universe, and Everything.                                             \n'

  expect(res).toStrictEqual(txt)
})

test('text uses default style if style has no line attribute', () => {
  const style = {}

  const res = text(
    'Deep Thought was created to come up with the Answer to ' +
    'The Ultimate Question of Life, the Universe, and Everything.'
  )(style)

  const txt = 'Deep Thought was created to come up with the Answer to The Ultimate Question of \n' +
              'Life, the Universe, and Everything.                                             \n'

  expect(res).toStrictEqual(txt)
})

test('textFrom correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: {width: 40}
  }

  const res = textFrom(id)('Deep Thought was created to come up with the Answer.')(style)

  const txt = 'Deep Thought was created to come up with\n' +
              'the Answer.                             \n'

  expect(res).toStrictEqual(txt)
})

test('textFrom with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'
  
  const style = {
    [id1]: {width: 40}
  }

  const res = textFrom(id2)(
    'Deep Thought was created to come up with the Answer to ' +
    'The Ultimate Question of Life, the Universe, and Everything.'
  )(style)

  const txt = 'Deep Thought was created to come up with the Answer to The Ultimate Question of \n' +
              'Life, the Universe, and Everything.                                             \n'

  expect(res).toStrictEqual(txt)
})