const {synopsis, synopsisFrom} = require('..')

test('synopsis README example works as expected', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.', required: true},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.', defaultValue: [false]},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.', contradicts: ['help']}
    ]
  }
  
  const style = {
    line: [{width: 40}]
  }
  
  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help]   \n'+
              '            [--version]                 \n'
  
  expect(res).toStrictEqual(txt)
})

test('synopsis generates expected string', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {values: 'yay'},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrase'}
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  // @ts-ignore
  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help]   \n' +
              '            [-v|-q] [--no-fun] (-f)     \n' +
              '            (<question>)                \n' +
              '            [<politePhrase>...]         \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis works without programName', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrase'}
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = synopsis()(opts)(style)

  const txt = '(-a|--answer) [-h|--help] [-v|-q]       \n' +
              '[--no-fun] (-f) (<question>)            \n' +
              '[<politePhrase>...]                     \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis prints only programName if opts are empty', () => {
  const opts = {}

  const style = {
    line: [{width: 40}]
  }

  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought                             \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis prints only programName if opts contains only undefined values', () => {
  const opts = {
    opts: [undefined, undefined]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought                             \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis ignores undefined values', () => {
  const opts = {
    opts: [
      undefined,
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      undefined,
      {key: 'help', types: [], args: ['-h', '--help']},
      undefined
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help]   \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis prints only programName if opts is undefined', () => {
  const style = {
    line: [{width: 40}]
  }

  const res = synopsis('deepThought')()(style)

  const txt = 'deepThought                             \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis uses default line style if line is undefined in style', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrase'}
    ]
  }

  const style = {
    b: []
  }

  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help] [-v|-q] [--no-fun] (-f) (<question>)      \n' +
              '            [<politePhrase>...]                                                 \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis uses default line style if style is undefined', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrase'}
    ]
  }

  const res = synopsis('deepThought')(opts)()

  const txt = 'deepThought (-a|--answer) [-h|--help] [-v|-q] [--no-fun] (-f) (<question>)      \n' +
              '            [<politePhrase>...]                                                 \n'

  expect(res).toStrictEqual(txt)
})

test('synopsis cuts programName if it is too long', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']}
    ]
  }

  const style = {
    line: [{width: 10}]
  }

  const res = synopsis('deepThought')(opts)(style)

  const txt = 'deepThough\n'

  expect(res).toStrictEqual(txt)
})

test('synopsisFrom correctly passes on id', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrase'}
    ]
  }

  const style = {
    custom: [{width: 70}]
  }

  const res = synopsisFrom('custom')('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help] [-v|-q] [--no-fun] (-f)         \n' +
              '            (<question>) [<politePhrase>...]                          \n'

  expect(res).toStrictEqual(txt)
})

test('synopsisFrom with wrong id uses default style', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], required: true},
      {key: 'help', types: [], args: ['-h', '--help']},
      {key: 'verbose', types: [], args: ['-v']},
      {key: 'verbose', types: [], args: ['-q'], reverse: true},
      {key: 'fun', types: ['bool'], args: ['-f'], required: true},
      {key: 'fun', types: ['bool'], args: ['--no-fun'], reverse: true},
      {key: 'question', types: ['string'], required: true},
      {key: 'politePhrases', descArg: 'phrases'}
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = synopsisFrom('custom')('deepThought')(opts)(style)

  const txt = 'deepThought (-a|--answer) [-h|--help] [-v|-q] [--no-fun] (-f) (<question>)      \n' +
              '            [<phrases>...]                                                      \n'

  expect(res).toStrictEqual(txt)
})