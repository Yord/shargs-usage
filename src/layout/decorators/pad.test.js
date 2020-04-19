const {line, pad} = require('../..')

test('pad README example works', () => {
  const style = {
    line: {width: 40}
  }
  
  const answer42 = line('The answer is 42.')

  const res = pad(['line'], 4)(answer42)(style)

  const exp = '    The answer is 42.                   \n'

  expect(res).toStrictEqual(exp)
})