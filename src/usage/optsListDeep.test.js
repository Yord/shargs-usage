const {optsListDeep} = require('..')

test('optsListDeep README example works as expected', () => {
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
    cols: [{width: 20}, {width: 25}]
  }

  const res = optsListDeep(opts)(style)

  const txt = '-a, --ans=<number>  The answer.              \n' +
              '-h, --help          Show the usage docs.     \n' +
              'ask                 Ask questions. [required]\n' +
              '    -h              Show the usage docs.     \n' +
              '    <questions>...  Ask questions. [required]\n'
  
  expect(res).toStrictEqual(txt)
})