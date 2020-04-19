const {line, pad, table} = require('../..')

test('pad README example works', () => {
  const style = {
    line: {width: 40}
  }
  
  const answer42 = line('The answer is 42.')

  const res = pad(['line'], 4)(answer42)(style)

  const exp = '    The answer is 42.                   \n'

  expect(res).toStrictEqual(exp)
})

test('pad works on arrays', () => {
  const style = {
    cols: [{width: 20}, {width: 20}]
  }
  
  const answer42 = table([['--answer', '42']])

  const res = pad(['cols', 0], 4)(answer42)(style)

  const exp = '    --answer        42                  \n'

  expect(res).toStrictEqual(exp)
})