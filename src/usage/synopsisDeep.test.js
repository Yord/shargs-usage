const {synopsisDeep} = require('..')

test('synopsisDeep README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: []},
    {key: 'questions', required: true}
  ]
  
  const opts = [
    {key: 'ask', args: ['ask'], opts: askOpts, required: true},
    {key: 'answer', args: ['-a', '--answer'], types: ['number']},
    {key: 'help', args: ['-h', '--help'], types: []}
  ]
  
  const style = {
    line: {width: 40}
  }
  
  const res = synopsisDeep('deepThought')(opts)(style)

  const txt = 'deepThought [-a|--answer] [-h|--help]   \n'+
              'deepThought ask [-h] (<questions>...)   \n'
  
  expect(res).toStrictEqual(txt)
})