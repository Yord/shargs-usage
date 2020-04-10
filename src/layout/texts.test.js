const {texts, textsFrom} = require('./texts')

test('texts generates expected string', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = texts([
    'Deep Thought was created to come up with the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])(style)

  const txt = 'Deep Thought was created to come up with\n' +
              'the Answer.                             \n' +
              'To The Ultimate Question of Life, the   \n' +
              'Universe, and Everything.               \n'

  expect(res).toStrictEqual(txt)
})

test('texts retains more than one consecutive whitespace even after line breaks', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = texts([
    'Deep Thought was created to come up with  the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])(style)

  const txt = 'Deep Thought was created to come up with\n' +
              '  the Answer.                           \n' +
              'To The Ultimate Question of Life, the   \n' +
              'Universe, and Everything.               \n'

  expect(res).toStrictEqual(txt)
})

test('texts prints the empty string if no strings are given', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = texts()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('texts prints the empty string if strings are empty', () => {
  const style = {
    line: {width: 40}
  }
  
  const res = texts([])(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('texts uses default style if style is undefined', () => {
  const res = texts([
    'Deep Thought was created to come up with the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])()

  const txt = 'Deep Thought was created to come up with the Answer.                            \n' +
              'To The Ultimate Question of Life, the Universe, and Everything.                 \n'

  expect(res).toStrictEqual(txt)
})

test('texts uses default style if style has no line attribute', () => {
  const style = {}

  const res = texts([
    'Deep Thought was created to come up with the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])(style)

  const txt = 'Deep Thought was created to come up with the Answer.                            \n' +
              'To The Ultimate Question of Life, the Universe, and Everything.                 \n'

  expect(res).toStrictEqual(txt)
})

test('textsFrom correctly passes on id', () => {
  const id = 'test'
  
  const style = {
    [id]: {width: 40}
  }

  const res = textsFrom(id)([
    'Deep Thought was created to come up with the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])(style)

  const txt = 'Deep Thought was created to come up with\n' +
              'the Answer.                             \n' +
              'To The Ultimate Question of Life, the   \n' +
              'Universe, and Everything.               \n'

  expect(res).toStrictEqual(txt)
})

test('textsFrom with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'
  
  const style = {
    [id1]: {width: 40}
  }

  const res = textsFrom(id2)([
    'Deep Thought was created to come up with the Answer.',
    'To The Ultimate Question of Life, the Universe, and Everything.'
  ])(style)

  const txt = 'Deep Thought was created to come up with the Answer.                            \n' +
              'To The Ultimate Question of Life, the Universe, and Everything.                 \n'

  expect(res).toStrictEqual(txt)
})

test('descs README example works as expected', () => {
  const descs = opts => style => {
    const descriptions = opts.map(_ => _.desc)
  
    return texts(descriptions)(style)
  }

  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.', defaultValue: [false]},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.', contradicts: ['help']}
  ]
  
  const style = {
    line: {width: 40}
  }
  
  const res = descs(opts)(style)

  const txt = 'The answer.                             \n'+
              'Prints help.                            \n' +
              'Prints version.                         \n'
  
  expect(res).toStrictEqual(txt)
})