const {optsDefsDeep} = require('..')

test('optsDefsDeep README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: [], desc: 'Show the usage docs.'},
    {key: 'questions', required: true, desc: 'Ask questions.'}
  ]

  const opts = [
    {key: 'ask', args: ['ask'], opts: askOpts, desc: 'Ask questions.', required: true},
    {key: 'answer', args: ['-a', '--ans'], types: ['number'], desc: 'The answer.'},
    {key: 'help', args: ['-h', '--help'], types: [], desc: 'Show the usage docs.'}
  ]

  const style = {
    line: {width: 30},
    desc: {padStart: 4, width: 26}
  }

  const res = optsDefsDeep(opts)(style)

  const txt = '-a, --ans=<number>            \n' +
              '    The answer.               \n' +
              '-h, --help                    \n' +
              '    Show the usage docs.      \n' +
              'ask [required]                \n' +
              '    Ask questions.            \n' +
              '    -h                        \n' +
              '        Show the usage docs.  \n' +
              '    <questions>... [required] \n' +
              '        Ask questions.        \n'
  
  expect(res).toStrictEqual(txt)
})